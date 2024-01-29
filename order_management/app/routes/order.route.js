const express = require("express");
const orderController = require("../controllers/order.controller");
const  { authValidate, authInitialize } = require("../middleware/auth.middleware");

const orderRoutes = express.Router()

orderRoutes.get("/all/:customerId",authValidate, orderController.getAllMyOrders)
orderRoutes.get("/:orderId",authValidate, orderController.getOrder)
orderRoutes.post("/",authValidate, orderController.placeOrder)
orderRoutes.delete("/:orderId",authValidate, orderController.cancelOrder)

module.exports = orderRoutes