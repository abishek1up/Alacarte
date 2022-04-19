const restaurantService = require("../services/restaurant.service")
const restaurant = require("../models/restaurant")

//const isAuthenticated = require(".../isAuthenticated");

module.exports = {
    getRestaurants : async (req, res) => {
        const restaurants = await restaurantService.getRestaurants()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(restaurants)
    },
    getRestaurant : async (req, res) => {
        const restaurants = await restaurantService.getRestaurant(req.params.id)
        if(restaurants.statusCode == 200 && (res.statusCode >= 200 && res.statusCode < 400)){
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(restaurants)
        }
        else
        {
            res.statusCode = 400
            res.setHeader('Content-Type','application/json')
            res.json(restaurants)
        }  
    },
    createRestaurant : async (req, res) => {
        try {
        const restaurants = await restaurantService.createRestaurant(req.body)
        if(restaurants.statusCode != 400){
         res.status(201).json(restaurants);
        }
        else
        {
         res.status(400).json(restaurants);
        }
        }
        catch (e) {
            if(!e.status) {
              res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
            } else {
              res.status(e.status).json( { error: { code: e.code, message: e.message } });
            }
        }    
    },
    deleteRestaurant : async (req, res) => {
        const check = await restaurantService.deleteRestaurant(req.params.id)
        if(check.acknowledged){
            const restaurants = await restaurantService.getRestaurants()
            res.statusCode = 200
            res.setHeader('Content-Type','application/json')
            res.json(restaurants)
        }
        else
        {
        res.statusCode = 400
        res.setHeader('Content-Type','application/json')
        res.json(check)
        }
    },
    updateRestaurant : async (req, res) => {
        try {
        const restaurants = await restaurantService.updateRestaurant(req.params.id,req.body)
        if(restaurants.statusCode != 400){
            res.status(201).json(restaurants);
           }
           else
           {
            res.status(400).json(restaurants);
           }
           }
           catch (e) {
               if(!e.status) {
                 res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
               } else {
                 res.status(e.status).json( { error: { code: e.code, message: e.message } });
               }
        }    
    },
    searchViaDistance : async (req, res) => {
        const restaurants = await restaurantService.searchViaDistance(req.params.id)
        if(restaurants.statusCode == 200 && (res.statusCode >= 200 && res.statusCode < 400)){
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(restaurants)
        }
        else
        {
            res.statusCode = 400
            res.setHeader('Content-Type','application/json')
            res.json(restaurants)
        }  
    },
    searchViaCoordinates : async (req, res) => {
        const restaurants = await restaurantService.searchViaCoordinates(req.params.id)
        if(restaurants.statusCode == 200 && (res.statusCode >= 200 && res.statusCode < 400)){
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(restaurants)
        }
        else
        {
            res.statusCode = 400
            res.setHeader('Content-Type','application/json')
            res.json(restaurants)
        }  
    }

}