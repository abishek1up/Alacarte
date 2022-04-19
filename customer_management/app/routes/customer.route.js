const express = require("express");
const customerController = require("../controllers/customer.controller");


const customerRoutes = express.Router()

// /orders is prefix from app/index.js 

customerRoutes.get("/:cust_Id", customerController.getCustomerDetail)
customerRoutes.delete("/:cust_Id", customerController.deactivateUser)

module.exports = customerRoutes