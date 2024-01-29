const customerService = require("../services/customer.service");
const tryCatchHandler = require("../utils/tryCatchHandler.util");
const AppError = require("../utils/appError");
const { loginSchema, registerSchema, updateCustomerSchema, customerId } = require("../models/validation");
const logger = require("../config/winston");

//Login Controller
/* exports.loginUser = tryCatchHandler(async (req, res, next) => {
  logger.info("User Login");
  const users = await customerService.loginUser(req.body);
  if (!users) {
    throw { Status: "ERROR", StatusCode: 401, Message: "User not registered2" };
  }
  res.status(200).send(users.Message);
  console.log(users);
}); */

exports.loginUser = (req, res, next) => {
  logger.info("User Login");
  const users = customerService.loginUser(req.body);
  if (!users) {
    console.log({ Status: "ERROR", StatusCode: 401, Message: "User not registered2" });
  }
  res.status(200).send(users.Message);
  console.log(users);
};

exports.registerUser = async (req, res) => {
  try {
    logger.info("User Registration");

    //Joi Validation
    await registerSchema
      .validateAsync(req.body)
      .then()
      .catch(function (error) {
        let err = new Error(error.message);
        err.status = 422;
        throw err;
      });

    //Service Layer Call
    var users = await customerService.registerUser(req.body);
    if (users.StatusCode == 201) {
      var customer = await customerService.registerCustomer(req.body, users);
    }
    return res.status(users.StatusCode).json(users);
  } catch (err) {
    logger.error("Error, StatusCode:" + err.status + " ,Message :" + err.message);
    res.status(err.status).json({
      Status: "ERROR",
      StatusCode: err.status,
      Message: err.message,
    });
  }
};

exports.getCustomerDetail = async (req, res) => {
  try {
    logger.info("Get User Details on Customer ID-" + req.params.customerId);

    //Joi Validation
    await customerId
      .validateAsync(req.params.customerId)
      .then()
      .catch(function (error) {
        let err = new Error("customerId" + error.message);
        err.status = 422;
        throw err;
      });

    //Service Layer Call
    const customers = await customerService.getCustomerDetail(req.params.customerId);
    if (customers.StatusCode == null) {
      logger.info("User Details on Customer ID-" + req.params.customerId + ", fetched Successfully");
      return res.status(200).json(customers);
    } else res.status(customers.StatusCode).json(customers);
  } catch (err) {
    logger.error("Error, StatusCode:" + err.status + " ,Message :" + err.message);
    res.status(err.status).json({
      Status: "ERROR",
      StatusCode: err.status,
      Message: err.message,
    });
  }
};

exports.updateCustomerDetail = async (req, res) => {
  try {
    logger.info("Update User Details on Customer ID-" + req.params.customerId);

    //Joi Validation
    await customerId
      .validateAsync(req.params.customerId)
      .then()
      .catch(function (error) {
        let err = new Error("customerId" + error.message);
        err.status = 422;
        throw err;
      });
    await updateCustomerSchema
      .validateAsync(req.body)
      .then()
      .catch(function (error) {
        let err = new Error(error.message);
        err.status = 422;
        throw err;
      });

    //Service Layer Call
    const customers = await customerService.updateCustomerDetail(req.params.customerId, req.body);
    if (customers.StatusCode == null) {
      logger.info("User Details on Customer ID-" + req.params.customerId + ", updated Successfully");
      return res.status(200).json(customers);
    } else {
      return res.status(customers.StatusCode).json(customers);
    }
  } catch (err) {
    logger.error("Error, StatusCode:" + err.status + " ,Message :" + err.message);
    res.status(err.status).json({
      Status: "ERROR",
      StatusCode: err.status,
      Message: err.message,
    });
  }
};

exports.deactivateUser = async (req, res) => {
  try {
    logger.info("Delete User using Customer ID-" + req.params.customerId);

    //Joi Validation
    await customerId
      .validateAsync(req.params.customerId)
      .then()
      .catch(function (error) {
        let err = new Error("customerId" + error.message);
        err.status = 422;
        throw err;
      });

    //Service Layer Call
    const check = await customerService.deactivateUser(req.params.customerId);
    if (check.acknowledged) {
      logger.info("User on Customer ID-" + req.params.customerId + ", deleted Successfully");
      return res.status(200).json(check);
    } else {
      return res.status(check.StatusCode).json(check);
    }
  } catch (err) {
    logger.error("Error, StatusCode:" + err.status + " ,Message :" + err.message);
    res.status(err.status).json({
      Status: "ERROR",
      StatusCode: err.status,
      Message: err.message,
    });
  }
};
