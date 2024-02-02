const express = require("express");
const orderController = require("../controllers/order.controller");
const { authValidate, authInitialize } = require("../middleware/auth.middleware");

const orderRoutes = express.Router();

orderRoutes.get("/all/:customerId", orderController.getAllMyOrders);
orderRoutes.get("/:orderId", orderController.getOrder);
orderRoutes.post("/", orderController.placeOrder);
orderRoutes.delete("/:orderId", orderController.cancelOrder);

module.exports = orderRoutes;
