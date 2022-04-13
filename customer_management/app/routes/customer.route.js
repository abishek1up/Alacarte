const express = require("express");
const customerController = require("../controllers/customer.controller");


const customerRoutes = express.Router()

// /orders is prefix from app/index.js 
customerRoutes.post("/", customerController.registerUser)
customerRoutes.get("/:cust_id", customerController.getCustomerDetail)
customerRoutes.get("/:order_id", customerController.getOrderDetail)
customerRoutes.get("/", customerController.getMyOrders)
customerRoutes.delete("/:cust_id", customerController.deactivateUser
)
module.exports = customerRoutes