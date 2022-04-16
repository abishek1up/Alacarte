const reviewService = require("../services/review.service")


module.exports = {
    getMyReviews :async (req, res) => {
        const review = await reviewService.getMyReviews()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(review)
    },
    getReview :async (req, res) => {
        const review = await reviewService.getReview(req.params.review_Id)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(review)
    },
    postReview : async (req, res) => {
        await reviewService.postReview(req.body)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        const review = await reviewService.getMyReviews()
        res.json(review)
    },
    deleteReview : async (req, res) => {
        const check = await reviewService.deleteReview(req.params.review_Id)
        if(check.acknowledged){
            const review = await reviewService.deleteReview()
            res.statusCode = 200
            res.setHeader('Content-Type','application/json')
            res.json(review)
        }
    },
    updateReview : async (req, res) => {
        await reviewService.updateReview(req.params.review_Id,req.body)
        const review = await reviewService.updateReview()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(review)
    }
}