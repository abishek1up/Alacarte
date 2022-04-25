// Business logic
// Database etc 

const restaurant = require("../models/restaurant")
const menu = require("../models/menu")

module.exports = {
    // params is object, for parameters from controllers
    getALLRestaurants: async () => {
        try {
            const restaurants = await restaurant.find().exec()
            if (restaurants != null) {
                return restaurants
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurants are present" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    getRestaurantByID: async (restaurantId) => {
        try {
            const restaurants = await restaurant.findOne({ restaurantId: restaurantId })
            if (restaurants != null) {
                return restaurants
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurants matching this Restaurant Id" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    createRestaurant: async (body) => {
            var restaurants = await restaurant.create(body);
            return { Status: "SUCCESS", StatusCode: 201, Message: "New Restaurant created" ,restaurantId : restaurants.restaurantId };
        
    },
    deleteRestaurantByID: async (restaurantId) => {
        try {
            var check = await restaurant.findOne({ restaurantId: restaurantId })
            if (check != null) {

                const Restaurants = await restaurant.deleteOne({ restaurantId: restaurantId })
                return { Status: "SUCCESS", StatusCode: 200, Message: "Restaurant Deleted", acknowledged: Restaurants.acknowledged }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurant matching this Customer ID" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    updateRestaurantDetailsByID: async (restaurantId, body) => {
            var check = await restaurant.findOne({ restaurantId: restaurantId })
            if (check != null) {
                try {
                    const customers = await restaurant.updateOne({ restaurantId: restaurantId }, { $set: { address: body.address, cuisine: body.cuisine, budget: body.budget, name: body.name } }, { new: true })
                    const customers2 = await restaurant.findOne({ restaurantId: restaurantId })
                    return customers2

                }
                catch (err) {
                    return { Status: "ERROR", StatusCode: 400, Message: err.message };
                }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurant matching this Restaurant ID" };
            }
    },
    updateRestaurantRating: async (Id, avgRating, totalRatings) => {
        try {
            const restaurants = await restaurant.updateOne({ restaurantId: Id }, { $set: { ratings: avgRating, total_reviews: totalRatings } }, { new: true })
            return restaurants
        }
        catch (err) {
            let message = err.message;
            var res = { "statusCode": 200, "json": {} };
            res.statusCode = 400
            res.json = {
                success: false,
                message: message,
            }
            return res;
        }
    },

    searchViaKeyword: async (keyword) => {
        try {
            var restaurants = await restaurant.find({ $text: { $search: keyword } })
            if (restaurants != null) {
                return restaurants
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurants matching this keyword" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    searchViaBudget: async (budget) => {
        try {
            const restaurants = await restaurant.find({ budget: { $lt: budget } })
            if (restaurants != null) {
                return restaurants
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurants matching this Restaurant Id" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },

    completeCache: async (restaurantId) => {
        try {
            const restaurants = await restaurant.findOne({ restaurantId: restaurantId })
            if (restaurants != null) {
                const menus = await menu.findOne({ menuId: restaurants.menuId })
                if (menus != null) {
                    var wholeCache = { restaurant : restaurants, menu : menus};
                    return wholeCache
                }
                else {
                    return restaurants;
                }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No restaurant for this Restaurant Id" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },

    


    getRestaurantMenu: async (restaurantId) => {
        try {
            var restaurants = await restaurant.findOne({ restaurantId: restaurantId })
            if (restaurants != null) {
                const menus = await menu.findOne({ menuId: restaurants.menuId })
                if (menus != null) {
                    return menus
                }
                else {
                    return { Status: "ERROR", StatusCode: 400, Message: "No menu for this Restaurant Id" };
                }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No menu for this Restaurant Id" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    createRestaurantMenu: async (body, restaurantId) => {
         try{
            var restaurants = await restaurant.findOne({ restaurantId: restaurantId })
            if (restaurants != null) {
                var itemIDArray = [];
                var menu_items = body.items;
                for (i = 0; i < menu_items.length; i++) {
                    var item = {};
                    item.item_Id = i + 1
                    item.item_Name = menu_items[i].item_Name
                    item.item_Cost = menu_items[i].item_Cost
                    if (Object.keys(item).length != 0) {
                        itemIDArray.push(item)
                    }
                }
                if (itemIDArray.length == 0) { return { Status: "ERROR", StatusCode: 400, Message: "No Items Ordered" }; }
                var menus = await menu.create({ menuId: restaurants.menuId, type: body.type, items: itemIDArray })

                return { Status: "SUCCESS", StatusCode: 201, Message: "New menu created" };
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurants matching this Restaurant Id" };
            }
        }
        catch (err) {
            err.status = 400;
            err.message.indexOf("duplicate key error collection")>-1 ? err.message = "Menu already existing for this Restaurant ID. Please try Update" : err.message
            return { Status: 'ERROR', StatusCode: err.status, Message: err.message };
        }
    },
    updateRestaurantMenu: async (restaurantId, menuId, body) => {
            var restaurants = await restaurant.findOne({ restaurantId: restaurantId })
            if (restaurants != null) {
                if (restaurants.menuId == menuId) {
                    var check = await menu.findOne({ menuId: menuId })
                    if (check != null) {
                        try {
                            var itemIDArray = [];
                            var menu_items = body.items;
                            for (i = 0; i < menu_items.length; i++) {
                                var item = {};
                                item.item_Id = i + 1
                                item.item_Name = menu_items[i].item_Name
                                item.item_Cost = menu_items[i].item_Cost
                                if (Object.keys(item).length != 0) {
                                    itemIDArray.push(item)
                                }
                            }
                            if (itemIDArray.length == 0) { return { Status: "ERROR", StatusCode: 400, Message: "No Items Ordered" }; }
                            const menus = await menu.updateOne({ menuId: menuId }, { $set: { type: body.type, items: itemIDArray } }, { new: true })
                            const menus2 = await menu.findOne({ menuId: menuId })
                            return menus2

                        }
                        catch (err) {
                            return { Status: "ERROR", StatusCode: 400, Message: err.message };
                        }
                    }
                    else {
                        return { Status: "ERROR", StatusCode: 400, Message: "No Menu matching this Menu ID" };
                    }
                }
                else {
                    return { Status: "ERROR", StatusCode: 400, Message: "No Restaurant connected with this menu ID" };
                }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurant connected with this menu ID" };
            }
    },
    deleteRestaurantMenu: async (restaurantId, menuId) => {
        try {
            var restaurants = await restaurant.findOne({ restaurantId: restaurantId })
            if (restaurants != null) {
                if (restaurants.menuId == menuId) {
                    var check = await menu.findOne({ menuId: menuId })
                    if (check != null) {

                        const menus = await menu.deleteOne({ menuId: menuId })
                        return { Status: "SUCCESS", StatusCode: 200, Message: "menu Deleted", acknowledged: menus.acknowledged }
                    }
                    else {
                        return { Status: "ERROR", StatusCode: 400, Message: "No menu matching this Customer ID" };
                    }
                }
                else {
                    return { Status: "ERROR", StatusCode: 400, Message: "No Restaurant connected with this menu ID" };
                }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurant connected with this menu ID" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    }

}