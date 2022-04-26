// Business logic
// Database etc 

const review = require("../models/review")
const axios = require("axios")
const review2 = require("../models/review")

module.exports = {
    getAllReviews: async () => {
        try {
            const reviews = await review.find().exec()
            if (reviews != null) {
                return reviews
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Reviews are present" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    getReview: async (review_Id) => {
        try {
            const reviews = await review.findOne({ review_Id: review_Id })
            if (reviews != null) {
                return reviews
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Reviews matching this Restaurant Id" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    postReview: async (body) => {
        var reviews = await review.create(body);
        return { Status: "SUCCESS", StatusCode: 201, Message: "New review created", review_Id : reviews.review_Id };
    },
    deleteReview: async (review_Id) => {
        try {
            var check = await review.findOne({ review_Id: review_Id })
            if (check != null) {

                const reviews = await review.deleteOne({ review_Id: review_Id })
                return { Status: "SUCCESS", StatusCode: 200, Message: "review Deleted", acknowledged: reviews.acknowledged }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "NO Review matching this review ID" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    updateReview: async (review_Id, review) => {
        var check = await review2.findOne({ review_Id: review_Id })
        if (check != null) {
            try {
                const reviews = await review2.updateOne({ review_Id: review_Id }, { $set: { review: review } }, { new: true })
                const reviews2 = await review2.findOne({ review_Id: review_Id })
                return reviews2

            }
            catch (err) {
                return { Status: "ERROR", StatusCode: 400, Message: err.message };
            }
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "No Review matching this Restaurant ID" };
        }
    },
    checkOrderValid: async (orderId,tokenHeader) => {
        try {
            var checkOrder = await axios.get("http://localhost:8083/order/" + orderId, {
                headers: {
                    Authorization: tokenHeader //the token is a variable which holds the token
                }
            }).then(function (response) {
                if (response.status != 200) { let err = new Error(response.Message); err.status = response.status; throw err; }
                return response;
            })
            .catch(function (error) {   
                 if(error != null) {     
                    let err = new Error(error.response.data.Message); err.status = error.response.status; throw err;
                }
            })

            if (checkOrder.status == 200) {
                return { Status: "SUCCESS", StatusCode: 200, acknowledged: true };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: err.status, acknowledged: false, Message: err.message };
        }
    },
    checkAvgRating: async () => {
        const reviews = await review.findOne({ review_Id: review_Id })
        var restaurantId = reviews.restaurantId;
        const avgRating = await review.aggregate([{ $match: { "restaurantId": restaurantId } }, { "$group": { "_id": null, AverageValue: { $avg: "$rating" }, "restaurantId": restaurantId } }]);
        return avgRating
    },
    checktotalRatings: async () => {
        const reviews = await review.findOne({ review_Id: review_Id })
        var restaurantId = reviews.restaurantId;
        const totalRatings = await review.aggregate(
            [
                {
                    $match:
                        { "restaurantId": restaurantId }
                }
                ,
                {
                    $count: "TotalRatings"
                }
            ]
        )
        return totalRatings
    }
}

