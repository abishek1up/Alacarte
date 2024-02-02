const customerService = require("../services/customer.service");
const tryCatchHandler = require("../utils/tryCatchHandler.util");
const { logger } = require("../config/winston");

//User Login
exports.loginUser = tryCatchHandler(async (req, res, next) => {
  logger.info("User Login");
  //Service Layer Call
  const data = await customerService.loginUser(req.body);
  res.setHeader("Content-Type", "application/json").status(data.StatusCode).json({ Status: data.Status, Message: data.Message });
});

//User Registration
exports.registerUser = tryCatchHandler(async (req, res, next) => {
  logger.info("User Registration");
  //Service Layer Call
  const data = await customerService.registerUser(req.body);
  res.setHeader("Content-Type", "application/json").status(data.StatusCode).json({ Status: data.Status, Message: data.Message });
});

//Fetch Customer Details
exports.getCustomerDetail = tryCatchHandler(async (req, res) => {
  logger.info("Get User Details on Customer ID-" + req.params.customerId);

  //Service Layer Call
  const data = await customerService.getCustomerDetail(req.params.customerId);
  res
    .setHeader("Content-Type", "application/json")
    .status(data.StatusCode)
    .send(JSON.stringify({ Status: data.Status, Message: data.Message, Response: data.Response }));
});

//Update Customer Details
exports.updateCustomerDetail = tryCatchHandler(async (req, res) => {
  logger.info("Update User Details on Customer ID-" + req.params.customerId);

  //Service Layer Call
  const data = await customerService.updateCustomerDetail(req.params.customerId, req.body);
  res.setHeader("Content-Type", "application/json").status(data.StatusCode).json({ Status: data.Status, Message: data.Message });
});

//Delete User
exports.deactivateUser = tryCatchHandler(async (req, res) => {
  logger.info("Delete User using Customer ID-" + req.params.customerId);

  //Service Layer Call
  const data = await customerService.deactivateUser(req.params.customerId);
  res.setHeader("Content-Type", "application/json").status(data.StatusCode).json({ Status: data.Status, Message: data.Message });
});
