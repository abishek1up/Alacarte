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
        const restaurants = await restaurant.findOne({_id:Id})
        return restaurants
    },
    createRestaurant: async (body) => {
        const restaurants = await restaurant.create(body)
        return restaurants
    },
    deleteRestaurant: async (Id) => {
        const restaurants = await restaurant.deleteOne({_id:Id})
        return restaurants
    },
    updateRestaurant: async (Id,body) => {       
        const restaurants = await restaurant.findByIdAndUpdate(Id, {$set: body}, { new: true })  
        return restaurants
    }
}