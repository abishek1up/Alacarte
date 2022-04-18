// Business logic
// Database etc 

const review = require("../models/review")

module.exports = {
    // params is object, for parameters from controllers
    getAllReviews: async () => {
        const reviews = await review.find().exec()
        return reviews
    },
    getReview: async (Id) => {
        const reviews = await review.findOne({_id:Id})
        return reviews
    },
    postReview: async (body) => {
        const reviews = await review.create(body)
        return reviews
    },
    deleteReview: async (Id) => {
        const reviews = await review.deleteOne({_id:Id})
        return reviews
    },
    updateReview: async (Id,body) => {
        const reviews = await review.findByIdAndUpdate(Id, {$set: body}, { new: true })  
        return reviews
    }
}