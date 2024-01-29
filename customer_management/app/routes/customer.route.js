const express = require("express");
const customerController = require("../controllers/customer.controller");
const { authValidate, authInitialize } = require("../middleware/auth.middleware");

const customerRoutes = express.Router();

customerRoutes.get("/:customerId", authValidate, customerController.getCustomerDetail);
customerRoutes.put("/:customerId", authValidate, customerController.updateCustomerDetail);
customerRoutes.delete("/:customerId", authValidate, customerController.deactivateUser);

module.exports = customerRoutes;
