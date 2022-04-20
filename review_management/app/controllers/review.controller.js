require("dotenv").config()
const reviewService = require("../services/review.service")
const review2 = require("../models/review")
const rabbitClient = require("../config/reviewdb")

const url = process.env.RABBIT_MQ_URL

module.exports = {
    getAllReviews: async (req, res) => {
        const review = await reviewService.getAllReviews()
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(review)
    },
    getReview: async (req, res) => {
        const review = await reviewService.getReview(req.params.review_Id)
        if (review.statusCode == 200 && (res.statusCode >= 200 && res.statusCode < 400)) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(review)
        }
        else {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.json(review)
        }
    },
    postReview: async (req, res) => {
        try {
            const review = await reviewService.postReview(req.body)
            if (review.statusCode != 400) {

                const avgRating = await reviewService.checkAvgRating(req.body.restaurant_Id)
                var avgRatingField = avgRating[0].AverageValue.toFixed(1);
                const totalRating = await reviewService.checktotalRatings(req.body.restaurant_Id)
                var totalRatingField = totalRating[0].TotalRatings;
                rabbitClient.client.connect(url, function (err, conn) {
                    if (err != null) bail(err);
                    console.log("Connected , Publish Review")
                    const data = {
                        restaurant_id: req.body.restaurant_Id,
                        avg_rating: avgRatingField,
                        totalRatings: totalRatingField
                    }
                    rabbitClient.publish_review(conn, data);
                    console.log("Review Published")
                });

                res.status(201).json(review);
            }
            else {
                res.status(400).json(review);
            }
        }
        catch (e) {
            if (!e.status) {
                res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: e.message } });
            } else {
                res.status(e.status).json({ error: { code: e.code, message: e.message } });
            }
        }
    },
    deleteReview: async (req, res) => {
        const check = await reviewService.deleteReview(req.params.review_Id)
        if (check.acknowledged) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(check)
        }
        else {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.json(check)
        }
    },
    updateReview: async (req, res) => {
        try {
            const review = await reviewService.updateReview(req.params.id, req.body)
            if (review.statusCode != 400) {
                res.status(201).json(review);
            }
            else {
                res.status(400).json(review);
            }
        }
        catch (e) {
            if (!e.status) {
                res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
            } else {
                res.status(e.status).json({ error: { code: e.code, message: e.message } });
            }
        }
    }
}