const express = require("express");
const reviewController = require("../controllers/review.controller");
const  { authValidate, authInitialize } = require("../middleware/auth.middleware");

const reviewRoutes = express.Router()

// /reviews is prefix from app/index.js 
reviewRoutes.get("/",authValidate, reviewController.getAllReviews)

reviewRoutes.post("/",authValidate, reviewController.postReview)
reviewRoutes.get("/:review_Id",authValidate, reviewController.getReview)
reviewRoutes.put("/:review_Id",authValidate, reviewController.updateReview)
reviewRoutes.delete("/:review_Id",authValidate, reviewController.deleteReview)

module.exports = reviewRoutes