require("dotenv").config()
const reviewService = require("../services/review.service")
const rabbitClient = require("../config/reviewdb")

const url = process.env.RABBIT_MQ_URL

module.exports = {
    getAllReviews: async (req, res) => {
        const reviews = await reviewService.getAllReviews()
        if (reviews.StatusCode == null)
            return res.status(200).json(reviews);
        else
            res.status(reviews.StatusCode).json(reviews);
    },
    getReview: async (req, res) => {
        const reviews = await reviewService.getReview(req.params.review_Id)
        if (reviews.StatusCode == null)
            return res.status(200).json(reviews);
        else
            res.status(reviews.StatusCode).json(reviews);
    },
    postReview: async (req, res) => {
        try {
            const checkValid = await reviewService.checkOrderValid(req.params.order_Id)
            if (checkValid.acknowledged) {
                const review = await reviewService.postReview(req.body)
                if (review.statusCode != 400) {

                    const avgRating = await reviewService.checkAvgRating(req.body.review_Id)
                    var avgRatingField = avgRating[0].AverageValue.toFixed(1);
                    const totalRating = await reviewService.checktotalRatings(req.body.review_Id)
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
        const checkValid = await reviewService.checkOrderValid(req.params.order_Id)
        if (checkValid.acknowledged) {
            const check = await reviewService.deleteReview(req.params.review_Id)
            if (check.acknowledged) {
                return res.status(200).json(check);
            }
            else {
                return res.status(check.StatusCode).json(check);
            }
        }
    },
    updateReview: async (req, res) => {
        const reviews = await reviewService.updateReview(req.params.review_Id, req.body)
        if (reviews.StatusCode == null) {
            return res.status(200).json(reviews);
        }
        else {
            return res.status(reviews.StatusCode).json(reviews);
        }
    }
}