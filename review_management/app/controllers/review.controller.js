require("dotenv").config()
const reviewService = require("../services/review.service")
const rabbitClient = require("../middleware/publisher.middleware")
const { reviewUpdateSchema, reviewCreateSchema, orderId, review_Id, customerId, restaurantId } = require("../models/validation")
const Redis = require('../services/redis.service')
const logger = require("../config/winston")

const url = process.env.RABBIT_MQ_URL

module.exports = {
    getAllReviewsByCustomer: async (req, res) => {
        try {
            logger.info('Get Review on customerId-' + req.params.customerId);

            //Joi Validation
            await customerId.validateAsync(req.params.customerId).then().catch(function (error) {
                let err = new Error("customerId :" + error.message); err.status = 422; throw err;
            })
        const reviews = await reviewService.getAllReviewsByCustomer(req.params.customerId)
        if (reviews.StatusCode == null)
            return res.status(200).json(reviews);
        else
            res.status(reviews.StatusCode).json(reviews);
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    getAllReviewsByRestaurant: async (req, res) => {
        try {
            logger.info('Get Review on restaurantId-' + req.params.restaurantId);

            //Joi Validation
            await restaurantId.validateAsync(req.params.restaurantId).then().catch(function (error) {
                let err = new Error("restaurantId :" + error.message); err.status = 422; throw err;
            })
        const reviews = await reviewService.getAllReviewsByRestaurant(req.params.restaurantId)
        if (reviews.StatusCode == null)
            return res.status(200).json(reviews);
        else
            res.status(reviews.StatusCode).json(reviews);
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    getReview: async (req, res) => {
        try {
            logger.info('Get Review on Review ID-' + req.params.review_Id);

            //Joi Validation
            await review_Id.validateAsync(req.params.review_Id).then().catch(function (error) {
                let err = new Error("review_Id :" + error.message); err.status = 422; throw err;
            })
            const reviews = await reviewService.getReview(req.params.review_Id)
            if (reviews.StatusCode == null)
                return res.status(200).json(reviews);
            else
                res.status(reviews.StatusCode).json(reviews);
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    postReview: async (req, res) => {
        try {

            //Joi Validation
            await orderId.validateAsync(req.body.orderId).then().catch(function (error) {
                let err = new Error("orderId :" + error.message); err.status = 422; throw err;
            })

            await reviewCreateSchema.validateAsync(req.body).then().catch(function (error) {
                let err = new Error(error.message); err.status = 422; throw err;
            })

            //Service Layer Call
            const checkValid = await reviewService.checkOrderValid(req.body.orderId, req.headers['authorization'])
            if (!checkValid.acknowledged) { let err = new Error(checkValid.Message); err.status = checkValid.StatusCode; throw err; }

            const review = await reviewService.postReview(req.body)
            if (review.statusCode != 400) {

                logger.info(req.body.restaurantId)
                const avgRating = await reviewService.checkAvgRating(req.body.restaurantId)
                var avgRatingField = avgRating[0].AverageValue.toFixed(1);
                logger.info(avgRatingField)

                const totalRating = await reviewService.checktotalRatings(req.body.restaurantId)
                var totalRatingField = totalRating[0].TotalRatings;

                logger.info(totalRatingField)

                rabbitClient.client.connect(url, function (err, conn) {
                    if (err != null) bail(err);
                    logger.info("Connected , Publish Review")
                    const data = {
                        restaurantId: req.body.restaurantId,
                        avg_rating: avgRatingField,
                        totalRatings: totalRatingField
                    }
                    rabbitClient.publish_review(conn, data);
                    logger.info("Review Published")
                });

                res.status(201).json(review);
            }
            else {
                res.status(400).json(review);
            }

        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    deleteReview: async (req, res) => {
        try {
            logger.info('Delete Review of Review ID-' + req.params.review_Id);

            var restaurantId = await reviewService.getRestID(req.params.review_Id);

            var delCache = await Redis.delCache(restaurantId);
            //Joi Validation
            await review_Id.validateAsync(req.params.review_Id).then().catch(function (error) {
                let err = new Error("review_Id :" + error.message); err.status = 422; throw err;
            })

            //Service Layer Call

            const check = await reviewService.deleteReview(req.params.review_Id)
            if (check.acknowledged) { 

                const avgRating = await reviewService.checkAvgRating(restaurantId)
                var avgRatingField = avgRating[0].AverageValue.toFixed(1);

                const totalRating = await reviewService.checktotalRatings(restaurantId)
                var totalRatingField = totalRating[0].TotalRatings;

                logger.info(totalRatingField)

                rabbitClient.client.connect(url, function (err, conn) {
                    if (err != null) bail(err);
                    logger.info("Connected , Publish Review")
                    const data = {
                        restaurantId: restaurantId,
                        avg_rating: avgRatingField,
                        totalRatings: totalRatingField
                    }
                    rabbitClient.publish_review(conn, data);
                    logger.info("Review Published")
                });
         

            return res.status(200).json(check);
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    updateReview: async (req, res) => {
        try {
            logger.info('Update Review of Review ID-' + req.params.review_Id);

            //Joi Validation
            await review_Id.validateAsync(req.params.review_Id).then().catch(function (error) {
                let err = new Error("review_Id :" + error.message); err.status = 422; throw err;
            })
            await reviewUpdateSchema.validateAsync(req.body).then().catch(function (error) {
                let err = new Error(error.message); err.status = 422; throw err;
            })

            //Service Layer Call
            const reviews = await reviewService.updateReview(req.params.review_Id, req.body.review, req.body.rating)
            if (reviews.StatusCode == null) {
                
                var restaurantId = await reviewService.getRestID(req.params.review_Id);

                var delCache = await Redis.delCache(restaurantId);
                const avgRating = await reviewService.checkAvgRating(restaurantId)
                var avgRatingField = avgRating[0].AverageValue.toFixed(1);

                const totalRating = await reviewService.checktotalRatings(restaurantId)
                var totalRatingField = totalRating[0].TotalRatings;

                logger.info(totalRatingField)

                rabbitClient.client.connect(url, function (err, conn) {
                    if (err != null) bail(err);
                    logger.info("Connected , Publish Review")
                    const data = {
                        restaurantId: restaurantId,
                        avg_rating: avgRatingField,
                        totalRatings: totalRatingField
                    }
                    rabbitClient.publish_review(conn, data);
                    logger.info("Review Published")
                });


                return res.status(200).json(reviews);
            }
            else {
                return res.status(reviews.StatusCode).json(reviews);
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    }
}