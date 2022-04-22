// Business logic
// Database etc 

const review = require("../models/review")

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
        if (Object.keys(body).length !== 0) {
            var reviews = await review.create(body);
             return { Status: "SUCCESS", StatusCode: 201, Message: "New review created" };
        }
        else { 
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    deleteReview: async (order_Id) => {
        try {
            var check = await order.findOne({order_Id:order_Id})
            if (check != null) {

                const reviews = await review.deleteOne({restaurant_id:restaurant_id})
                return { Status: "SUCCESS", StatusCode: 200, Message: "review Deleted", acknowledged : Restaurants.acknowledged }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Restaurant matching this Customer ID" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    updateReview: async (Id, body) => {
        try {
            const reviews = await review.findByIdAndUpdate(Id, { $set: body }, { new: true })
            return reviews
        }
        catch (err) {
            let message = err.message;
            var res = { "statusCode": 200, "json": {} };
            res.statusCode = 400
            res.json = {
                success: false,
                message: message,
            }
            return res;
        }
    },
    checkOrderValid: async (order_Id) => {
        try {
             var checkOrder = await axios.get("http://localhost:8083/order/" + order_Id)
              .then(function (response) {
                return response.status;
              })
              .catch(function (error) {
                return response.status;
              }) 

            if (checkOrder == 200) {
                return { Status: "SUCCESS", StatusCode: 200 , acknowledged : true};
            } 
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message:  err.message };
        }
    },
    checkAvgRating: async (Id) => {
        const avgRating = await review.aggregate([{ $match: { "restaurant_Id": Id } }, { "$group": { "_id": null, AverageValue: { $avg: "$rating" } } }]);
        return avgRating
    },
    checktotalRatings: async (Id) => {
        const totalRatings = await review.aggregate(
            [
              {
                $match: 
                    { "restaurant_Id": Id }
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

