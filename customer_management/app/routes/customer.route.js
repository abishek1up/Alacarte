const express = require("express");
const customerController = require("../controllers/customer.controller");


const customerRoutes = express.Router()

// /orders is prefix from app/index.js 
customerRoutes.post("/", customerController.registerUser)
customerRoutes.get("/:cust_Id", customerController.getCustomerDetail)
/* 
customerRoutes.get("/:order_id", customerController.getOrderDetail)
customerRoutes.get("/:cust_id", customerController.getMyOrders) */
customerRoutes.delete("/:cust_Id", customerController.deactivateUser)
module.exports = customerRoutes