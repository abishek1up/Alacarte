const restaurantService = require("../services/restaurant.service")
const restaurant = require("../models/restaurant")

module.exports = {
    getRestaurants : async (req, res) => {
        const restaurants = await restaurantService.getRestaurants()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(restaurants)
    },
    getRestaurant : async (req, res) => {
        const restaurants = await restaurantService.getRestaurant(req.params.id)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(restaurants)
    },
    createRestaurant : async (req, res) => {
        await restaurantService.createRestaurant(req.body)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        const restaurants = await restaurantService.getRestaurants()
        res.json(restaurants)
    },
    deleteRestaurant : async (req, res) => {
        const check = await restaurantService.deleteRestaurant(req.params.id)
        if(check.acknowledged){
            const restaurants = await restaurantService.getRestaurants()
            res.statusCode = 200
            res.setHeader('Content-Type','application/json')
            res.json(restaurants)
        }
    },
    updateRestaurant : async (req, res) => {
        await restaurantService.updateRestaurant(req.params.id,req.body)
        const restaurants = await restaurantService.getRestaurants()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(restaurants)
    }
}