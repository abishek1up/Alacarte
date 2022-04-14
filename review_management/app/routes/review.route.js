const express = require("express");
const reviewController = require("../controllers/review.controller");

const reviewRoutes = express.Router()

// /reviews is prefix from app/index.js 
reviewRoutes.get("/", reviewController.getMyReviews)
reviewRoutes.post("/:id", reviewController.postReview)
reviewRoutes.delete("/:id", reviewController.deletereview)
reviewRoutes.put("/:id", reviewController.updatereview)
module.exports = reviewRoutes