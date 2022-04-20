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
        try {
            const reviews = await review.findOne({ _id: Id })
            if (reviews != null) {
                return reviews
            }
            else {
                let message = "No Review matches with the Id";
                var res = {};
                res.statusCode = 400
                res.acknowledged = false
                res.json = {
                    success: false,
                    message: message,
                }
                return res;
            }
        }
        catch (err) {
            console.log(err);
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
    postReview: async (body) => {
        try {
            const reviews = await review.create(body)
            return reviews
        }
        catch (err) {
            let message = err.message;
            var res = {};
            res.statusCode = 400
            res.json = {
                success: false,
                message: message,
            }
            return res;
        }
    },
    deleteReview: async (Id) => {
        var et = await review.findById({ _id: Id })
        if (et != null) {
            try {
                const reviews = await review.deleteOne({ _id: Id })
                return reviews
            }
            catch (err) {
                let message = err.message;
                var res = { "statusCode": 200, "json": {} };
                res.statusCode = 400
                res.acknowledged = false
                res.json = {
                    success: false,
                    message: message,
                }
                return res;
            }
        }
        else {
            let message = "No Review matches with the Id";
            var res = { "statusCode": 200, "json": {} };
            res.statusCode = 400
            res.acknowledged = false
            res.json = {
                success: false,
                message: message,
            }
            return res;
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

