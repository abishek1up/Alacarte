const express = require("express");
const orderController = require("../controllers/order.controller");


const orderRoutes = express.Router()

orderRoutes.get("/:order_Id", orderController.getOrder)
orderRoutes.post("/:customerId/:restaurant_Id", orderController.placeOrder)
orderRoutes.delete("/:order_Id", orderController.cancelOrder)

module.exports = orderRoutes