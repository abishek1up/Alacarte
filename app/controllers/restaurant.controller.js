const restaurantService = require("../services/restaurant.service");
const Redis = require("../services/redis.service");
const { keyword, budget, restaurantCreateSchema, restaurantId, menuCreateSchema, menuId } = require("../models/validation");
const { logger } = require("../config/winston");
const tryCatchHandler = require("../utils/tryCatchHandler.util");

exports.getALLRestaurants = tryCatchHandler(async (req, res) => {
  logger.info("Get All Orders of Restaurants");

  //Service Layer Call
  const restaurants = await restaurantService.getALLRestaurants();
  logger.info("Fetch all Restaurants Complete");
  res.status(200).json(restaurants);
});

exports.getRestaurantByID = tryCatchHandler(async (req, res) => {
  logger.info("Get Restaurant by Restaurant ID-" + req.params.restaurantId);

  //Service Layer Call
  const restaurants = await restaurantService.getRestaurantByID(req.params.restaurantId);
  res.status(restaurants.StatusCode).json(restaurants);
});

exports.createRestaurant = tryCatchHandler(async (req, res) => {
  logger.info("Create new Restaurant");

  //Service Layer Call
  var restaurants = await restaurantService.createRestaurant(req.body);
  res.status(restaurants.StatusCode).json(restaurants);
});

exports.deleteRestaurantByID = tryCatchHandler(async (req, res) => {
  logger.info("Delete Restaurant by Restaurant ID-" + req.params.restaurantId);

  //Service Layer Call
  const check = await restaurantService.deleteRestaurantByID(req.params.restaurantId);
  res.status(200).json(check);
});

exports.updateRestaurantDetailsByID = tryCatchHandler(async (req, res) => {
  logger.info("Update Restaurant Details by Restaurant ID-" + req.params.restaurantId);

  //Service Layer Call
  const restaurants = await restaurantService.updateRestaurantDetailsByID(req.params.restaurantId, req.body);
  await Redis.delCache(req.params.restaurantId);
  return res.status(200).json(restaurants);
});

exports.searchViaKeyword = tryCatchHandler(async (req, res) => {
  logger.info("Search Restaurant by Keyword -" + req.params.keyword);

  //Service Layer Call
  const restaurants = await restaurantService.searchViaKeyword(req.params.keyword);
  res.status(restaurants.StatusCode).json(restaurants);
});

exports.searchViaBudget = tryCatchHandler(async (req, res) => {
  logger.info("Search Restaurant by budget -" + req.params.budget);

  //Service Layer Call
  const restaurants = await restaurantService.searchViaBudget(req.params.budget);
  res.status(restaurants.StatusCode).json(restaurants);
});

//COMPLETE CACHE
exports.completeCache = tryCatchHandler(async (req, res) => {
  logger.info("Cache Restaurant by restaurantId -" + req.params.restaurantId);

  //Service Layer Call
  const restaurants = await restaurantService.getRestaurantByID(req.params.restaurantId);
  if (restaurants.StatusCode == null) {
    var result = await Redis.getCache(req.params.restaurantId);
    if (!result.Status) {
      logger.info("Restuarant Id-" + req.params.restaurantId + " is Not Cached");
      const restaurants = await restaurantService.completeCache(req.params.restaurantId);
      const saveResult = await Redis.setCache(req.params.restaurantId, restaurants);
      logger.info("Cached Value", saveResult);

      result = await Redis.getCache(req.params.restaurantId);
      res.status(200).json(result.response);
    }
  }
});

exports.getRestaurantMenu = tryCatchHandler(async (req, res) => {
  logger.info("Get Menu for Restaurant of Restaurant ID-" + req.params.restaurantId);

  //Service Layer Call
  const menus = await restaurantService.getRestaurantMenu(req.params.restaurantId);
  res.status(menus.StatusCode).json(menus);
});

exports.createRestaurantMenu = tryCatchHandler(async (req, res) => {
  logger.info("Create Menu for Restaurant of Restaurant ID-" + req.params.restaurantId);

  //Service Layer Call
  const menus = await restaurantService.createRestaurantMenu(req.body, req.params.restaurantId);
  res.status(menus.StatusCode).json(menus);
});

exports.updateRestaurantMenu = tryCatchHandler(async (req, res) => {
  logger.info("Get Menu for Restaurant of Restaurant ID-" + req.params.restaurantId);

  //Service Layer Call
  const menus = await restaurantService.updateRestaurantMenu(req.params.restaurantId, req.params.menuId, req.body);
  await Redis.delCache(req.params.restaurantId);
  return res.status(200).json(menus);
});

exports.deleteRestaurantMenu = tryCatchHandler(async (req, res) => {
  logger.info("Get Menu for Restaurant of Restaurant ID-" + req.params.restaurantId);

  //Service Layer Call
  const check = await restaurantService.deleteRestaurantMenu(req.params.restaurantId, req.params.menuId);
  var delCache = await Redis.delCache(req.params.restaurantId);
  res.status(200).json(check);
});
