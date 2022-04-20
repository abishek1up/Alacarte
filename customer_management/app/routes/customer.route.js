const express = require("express");
const customerController = require("../controllers/customer.controller");


const customerRoutes = express.Router()

// /orders is prefix from app/index.js 

customerRoutes.get("/:customerId", customerController.getCustomerDetail)
customerRoutes.put("/:customerId", customerController.updateCustomerDetail)
customerRoutes.delete("/:customerId", customerController.deactivateUser)

module.exports = customerRoutes