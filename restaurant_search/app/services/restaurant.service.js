// Business logic
// Database etc 

const restaurant = require("../models/restaurant")

module.exports = {
    // params is object, for parameters from controllers
    getRestaurants: async () => {
        const restaurants = await restaurant.find().exec()
        return restaurants
    },
    getRestaurant: async (Id) => {
        try {
            const restaurants = await restaurant.findOne({_id:Id})
            if(restaurants != null){
            return restaurants
            }
            else {
                let message = "No Restaurant matches with the Id";
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
            var res = { "statusCode" : 200 , "json":{}};
            res.statusCode = 400
            res.json = {
                success: false,
                message: message,
                }
            return res;
        }
    },
    createRestaurant: async (body) => {
        try {
        const restaurants = await restaurant.create(body)
        console.log(restaurants)
        return restaurants
        }
        catch (err) { 
            let message = err.message;
            var res = {};
            res.statusCode = 400
            res.json = {
                success: false,
                message: message,
                  }
            return res;
        }
    },
    deleteRestaurant: async (Id) => {
        var et = await restaurant.findById({_id:Id})
        if(et != null){
        try {
        const restaurants = await restaurant.deleteOne({_id:Id})
        return restaurants
        }
        catch (err) {  let message = err.message;
            var res = { "statusCode" : 200 , "json":{}};
            res.statusCode = 400
            res.acknowledged = false
            res.json = {
                success: false,
                message: message,
                  }
            return res;
         }
        }
        else {
            let message = "No Restaurant matches with the Id";
            var res = { "statusCode" : 200 , "json":{}};
            res.statusCode = 400
            res.acknowledged = false
            res.json = {
                success: false,
                message: message,
                  }
            return res;
        }
    },
    updateRestaurant: async (Id,body) => {       
        try {
        const restaurants = await restaurant.findByIdAndUpdate(Id, {$set: body}, { new: true })  
        return restaurants
        }
        catch (err) {  let message = err.message;
            var res = { "statusCode" : 200 , "json":{}};
            res.statusCode = 400
            res.json = {
                success: false,
                message: message,
                  }
            return res;
        }
    },
    updateRestaurantRating: async (Id,avgRating,totalRatings) => {       
        try {
        const restaurants = await restaurant.updateOne({restaurant_id:Id}, { $set:{ ratings:avgRating, total_reviews:totalRatings } }, { new: true })  
        return restaurants
        }
        catch (err) {  let message = err.message;
            var res = { "statusCode" : 200 , "json":{}};
            res.statusCode = 400
            res.json = {
                success: false,
                message: message,
                  }
            return res;
        }
    },
    searchRestaurantViaDistance: async (Id,body) => {       
        try {
            const restaurants = await restaurant.findOne({_id:Id})
            if(et != null){
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
            var res = { "statusCode" : 200 , "json":{}};
            res.statusCode = 400
            res.json = {
                success: false,
                message: message,
                }
            return res;
        }
    },
    searchRestaurantViaCoordinates: async (Id,body) => {       
        try {
            const restaurants = await restaurant.findOne({_id:Id})
            if(et != null){
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
            var res = { "statusCode" : 200 , "json":{}};
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
    }

}