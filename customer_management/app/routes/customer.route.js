const express = require("express");
const customerController = require("../controllers/customer.controller");
const  { authValidate, authInitialize, authenticateToken } = require("../middleware/auth.middleware");

const customerRoutes = express.Router()

// /orders is prefix from app/index.js 

customerRoutes.get("/:customerId", authValidate, customerController.getCustomerDetail)
customerRoutes.put("/:customerId", authValidate, customerController.updateCustomerDetail)
customerRoutes.delete("/:customerId", authValidate, customerController.deactivateUser)

module.exports = customerRoutes