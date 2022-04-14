const orderService = require("../services/review.service")


module.exports = {
    getMyReviews : async (req, res) => {
        const reviews = await reviewService.getMyReviews()
        res.json(reviews)
    },
    postReview : async (req, res) => {
        const restaurants = await restaurantService.postReview(req.params.id)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(restaurants)
    },
    deleteReview : async (req, res) => {
        const check = await restaurantService.deleteReview(req.params.id)
        if(check.acknowledged){
            res.statusCode = 200
            res.setHeader('Content-Type','application/json')
            res.json(restaurants)
        }
    },
    updateReview : async (req, res) => {
        await restaurantService.updateReview(req.params.id,req.body)
        const restaurants = await restaurantService.getRestaurants()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(restaurants)
    }
}