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
    createRestaurant: async (body) => {
        try {
        const restaurants = await restaurant.create(body)
        console.log(restaurants)
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
    deleteRestaurant: async (Id) => {
        var et  = await restaurant.findById({_id:Id})
        if(et != null){
        try {
         console.log(et);
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
            let message = "the Id is not present";
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
    searchRestaurantViaRatings: async (Id,body) => {       
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
    searchRestaurantViaCuisine: async (Id,body) => {       
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
    searchRestaurantViaBudget: async (Id,body) => {       
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
    }

}