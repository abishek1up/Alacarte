const express = require("express");
const reviewController = require("../controllers/review.controller");

const reviewRoutes = express.Router()

// /reviews is prefix from app/index.js 
reviewRoutes.get("/", reviewController.getMyReviews)
reviewRoutes.get("/:review_Id", reviewController.getReview)
reviewRoutes.post("/", reviewController.postReview)
reviewRoutes.delete("/:review_Id", reviewController.deleteReview)
reviewRoutes.put("/:review_Id", reviewController.updateReview)

module.exports = reviewRoutes