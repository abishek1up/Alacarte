const express = require("express");
const restaurantRoutes = express.Router()

const restaurantController = require("../controllers/restaurant.controller");

restaurantRoutes.get("/", restaurantController.getALLRestaurants)
restaurantRoutes.get("/completeCache/:restaurant_id", restaurantController.completeCache)

restaurantRoutes.get("/:restaurant_id", restaurantController.getRestaurantByID)
restaurantRoutes.post("/", restaurantController.createRestaurant)
restaurantRoutes.delete("/:restaurant_id", restaurantController.deleteRestaurantByID)
restaurantRoutes.put("/:restaurant_id", restaurantController.updateRestaurantDetailsByID)

restaurantRoutes.get("/search-keyword/:keyword", restaurantController.searchViaKeyword)
restaurantRoutes.get("/search-bugdet/:budget", restaurantController.searchViaBudget)
restaurantRoutes.get("/searchViaDistance/:id", restaurantController.searchViaDistance)
restaurantRoutes.get("/searchViaCoordinates/:id", restaurantController.searchViaCoordinates)

restaurantRoutes.get("/:restaurant_id/menu", restaurantController.getRestaurantMenu)
restaurantRoutes.post("/:restaurant_id/menu", restaurantController.createRestaurantMenu)
restaurantRoutes.put("/:restaurant_id/menu/:menu_id", restaurantController.updateRestaurantMenu)
restaurantRoutes.delete("/:restaurant_id/menu/:menu_id", restaurantController.deleteRestaurantMenu)

restaurantRoutes.get("/:restaurant_id/menu", restaurantController.getRestaurantMenu)
restaurantRoutes.post("/:restaurant_id/menu", restaurantController.createRestaurantMenu)
restaurantRoutes.put("/:restaurant_id/menu/:menu_id", restaurantController.updateRestaurantMenu)
restaurantRoutes.delete("/:restaurant_id/menu/:menu_id", restaurantController.deleteRestaurantMenu)



module.exports = restaurantRoutes