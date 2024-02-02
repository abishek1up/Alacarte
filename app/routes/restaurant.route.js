const express = require("express");
const restaurantRoutes = express.Router();

const restaurantController = require("../controllers/restaurant.controller");

restaurantRoutes.get("/", restaurantController.getALLRestaurants);
restaurantRoutes.get("/completeCache/:restaurantId", restaurantController.completeCache);

restaurantRoutes.get("/:restaurantId", restaurantController.getRestaurantByID);
restaurantRoutes.post("/", restaurantController.createRestaurant);
restaurantRoutes.delete("/:restaurantId", restaurantController.deleteRestaurantByID);
restaurantRoutes.put("/:restaurantId", restaurantController.updateRestaurantDetailsByID);

restaurantRoutes.get("/search-keyword/:keyword", restaurantController.searchViaKeyword);
restaurantRoutes.get("/search-bugdet/:budget", restaurantController.searchViaBudget);

restaurantRoutes.get("/:restaurantId/menu", restaurantController.getRestaurantMenu);
restaurantRoutes.post("/:restaurantId/menu", restaurantController.createRestaurantMenu);
restaurantRoutes.put("/:restaurantId/menu/:menuId", restaurantController.updateRestaurantMenu);
restaurantRoutes.delete("/:restaurantId/menu/:menuId", restaurantController.deleteRestaurantMenu);

module.exports = restaurantRoutes;
