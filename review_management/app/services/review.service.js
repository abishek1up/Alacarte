// Business logic
// Database etc 

const Order = require("../models/review")

module.exports = {
    // params is object, for parameters from controllers
    getMyReviews: async () => {
        const restaurants = await restaurant.find().exec()
        return restaurants
    },
    postReview: async (Id) => {
        const restaurants = await restaurant.findOne({_id:Id})
        return restaurants
    },
    deleteReview: async (body) => {
        const restaurants = await restaurant.create(body)
        return restaurants
    },
    updateReview: async (Id) => {
        const restaurants = await restaurant.deleteOne({_id:Id})
        return restaurants
    }
}