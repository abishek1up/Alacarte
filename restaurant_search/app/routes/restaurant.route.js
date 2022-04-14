const express = require("express");
const restaurantRoutes = express.Router()

const restaurantController = require("../controllers/restaurant.controller");

// /orders is prefix from app/index.js 
restaurantRoutes.get("/", restaurantController.getRestaurants)
restaurantRoutes.get("/:id", restaurantController.getRestaurant)
restaurantRoutes.post("/", restaurantController.createRestaurant)
restaurantRoutes.delete("/:id", restaurantController.deleteRestaurant)
restaurantRoutes.put("/:id", restaurantController.updateRestaurant)

module.exports = restaurantRoutes