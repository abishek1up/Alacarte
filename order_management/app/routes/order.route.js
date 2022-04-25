const express = require("express");
const orderController = require("../controllers/order.controller");
const  { authValidate, authInitialize } = require("../middleware/auth.middleware");

const orderRoutes = express.Router()

orderRoutes.get("/all/:customerId",authValidate, orderController.getAllMyOrders)
orderRoutes.get("/:order_Id",authValidate, orderController.getOrder)
orderRoutes.post("/",authValidate, orderController.placeOrder)
orderRoutes.delete("/:order_Id",authValidate, orderController.cancelOrder)

module.exports = orderRoutes