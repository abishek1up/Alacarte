// Business logic
// Database etc 

const restaurant = require("../models/restaurant")
const menu = require("../models/menu")
var test = require('mongoose');

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
    getRestaurantByID: async (restaurant_id) => {
        try {
            const restaurants = await restaurant.findOne({ restaurant_id: restaurant_id })
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
        if (Object.keys(body).length !== 0) {
            var restaurants = await restaurant.create(body);
            return { Status: "SUCCESS", StatusCode: 201, Message: "New Restaurant created" };
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    deleteRestaurantByID: async (restaurant_id) => {
        try {
            var check = await restaurant.findOne({ restaurant_id: restaurant_id })
            if (check != null) {

                const Restaurants = await restaurant.deleteOne({ restaurant_id: restaurant_id })
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
    updateRestaurantDetailsByID: async (restaurant_id, body) => {
        if (Object.keys(body).length !== 0) {
            var check = await restaurant.findOne({ restaurant_id: restaurant_id })
            if (check != null) {
                try {
                    const customers = await restaurant.updateOne({ restaurant_id: restaurant_id }, { $set: { address: body.address, cuisine: body.cuisine, budget: body.budget, name: body.name } }, { new: true })
                    const customers2 = await restaurant.findOne({ restaurant_id: restaurant_id })
                    return customers2

                }
                catch (err) {
                    return { Status: "ERROR", StatusCode: 400, Message: err.message };
                }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Customer matching this Customer ID" };
            }
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    updateRestaurantRating: async (Id, avgRating, totalRatings) => {
        try {
            const restaurants = await restaurant.updateOne({ restaurant_id: Id }, { $set: { ratings: avgRating, total_reviews: totalRatings } }, { new: true })
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
    searchRestaurantViaDistance: async (Id, body) => {
        try {
            const restaurants = await restaurant.findOne({ _id: Id })
            if (et != null) {
                return restaurants
            }
            else {
                let message = "the Id is not present";
                var res = {};
                res.statusCode = 400
                res.acknowledged = false
                res.json = {
                    success: false,
                    message: message,
                }
                return res;
            }
        }
        catch (err) {
            console.log(err);
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
    searchRestaurantViaCoordinates: async (Id, body) => {
        try {
            const restaurants = await restaurant.findOne({ _id: Id })
            if (et != null) {
                return restaurants
            }
            else {
                let message = "the Id is not present";
                var res = {};
                res.statusCode = 400
                res.acknowledged = false
                res.json = {
                    success: false,
                    message: message,
                }
                return res;
            }
        }
        catch (err) {
            console.log(err);
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
    cacheDB: async () => {
        const restaurants = await restaurant.find().exec()
        return restaurants
    },


    getRestaurantMenu: async (restaurant_id) => {
        try {
            var restaurants = await restaurant.findOne({ restaurant_id: restaurant_id })
            if (restaurants != null) {
                const menus = await menu.findOne({ menu_id: restaurants.menu_id })
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
    createRestaurantMenu: async (body, restaurant_id) => {
        if (Object.keys(body).length != 0) {
            var restaurants = await restaurant.findOne({ restaurant_id: restaurant_id })
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
                var menus = await menu.create({ menu_id: restaurants.menu_id, type: body.type, items: itemIDArray })

                return { Status: "SUCCESS", StatusCode: 201, Message: "New menu created" };
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurants matching this Restaurant Id" };
            }
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    updateRestaurantMenu: async (restaurant_id, menu_id, body) => {
        if (Object.keys(body).length !== 0) {
            var restaurants = await restaurant.findOne({ restaurant_id: restaurant_id })
            if (restaurants != null) {
                if (restaurants.menu_id == menu_id) {
                    var check = await menu.findOne({ menu_id: menu_id })
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
                            const menus = await menu.updateOne({ menu_id: menu_id }, { $set: { type: body.type, items: itemIDArray } }, { new: true })
                            const menus2 = await menu.findOne({ menu_id: menu_id })
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
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    deleteRestaurantMenu: async (restaurant_id, menu_id) => {
        try {
            var restaurants = await restaurant.findOne({ restaurant_id: restaurant_id })
            if (restaurants != null) {
                if (restaurants.menu_id == menu_id) {
                    var check = await menu.findOne({ menu_id: menu_id })
                    if (check != null) {

                        const menus = await menu.deleteOne({ menu_id: menu_id })
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