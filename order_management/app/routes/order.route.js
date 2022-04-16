const express = require("express");
const orderController = require("../controllers/order.controller");


const orderRoutes = express.Router()

// /orders is prefix from app/index.js 
orderRoutes.get("/", orderController.getOrders)
orderRoutes.get("/:order_id", orderController.getOrder)
orderRoutes.post("/", orderController.placeOrder)
orderRoutes.delete("/:order_id", orderController.cancelOrder)

module.exports = orderRoutes