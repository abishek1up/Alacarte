const express = require("express");
const orderController = require("../controllers/order.controller");


const orderRoutes = express.Router()

// /orders is prefix from app/index.js 
orderRoutes.get("/", orderController.getOrders)

module.exports = orderRoutes