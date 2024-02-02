const Customer = require("../models/customer");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authValidate, authInitialize } = require("../middleware/auth.middleware");
const { logger } = require("../config/winston");
const { loginSchema, registerSchema, updateCustomerSchema, customerId } = require("../models/validation");

const loginUser = async (body) => {
  //Joi Validation
  const { error, value } = await loginSchema.validateAsync(body);
  if (error) {
    throw { Status: "ERROR", StatusCode: 302, Message: error.message };
  }

  //Data Access Call
  const { email, password } = body;
  const data = await User.findOne({ email: email, password: password });
  if (data == null || data.length === 0) {
    throw { Status: "ERROR", StatusCode: 401, Message: "User not registered" };
  }
  /*  const payload = { email: email, password: password }; 

    var tokenGenerator = authInitialize(payload);
    if (!tokenGenerator.status) {
      throw {
        Status: "Fail",
        StatusCode: 401,
        message: "Token not generated",
        error_info: token,
      };
    } */
  return { Status: "SUCCESS", StatusCode: 200, Message: "User registered" };
};

const registerUser = async (body) => {
  //Joi Validation
  const { error, value } = await registerSchema.validateAsync(body);
  if (error) {
    throw { Status: "ERROR", StatusCode: 302, Message: error.message };
  }

  //Data Access Call
  const userExists = await User.findOne({ email: body.email });
  if (userExists) {
    throw { Status: "Fail", StatusCode: 409, Message: "Email ID already registered. Please sign up with another Email ID" };
  } else {
    var users = await User.create({ email: body.email, password: body.password })
      .then(function (newUser) {
        registerCustomer(body, newUser);
        return { Status: "SUCCESS", StatusCode: 201, Message: "New User Registered" + " with Customer ID: " + newUser.customerId };
      })
      .catch(function (err) {
        throw { Status: "ERROR", StatusCode: 422, Message: err.message };
      });

    return users;
  }
};

const registerCustomer = async (body, newUser) => {
  //Data Access Call
  var newCustomer = await Customer.create({ customerName: body.customerName, customerId: newUser.customerId, location: { city: body.location.city, state: body.location.state } });
  return { Status: "SUCCESS", StatusCode: 201, Message: "New Customer Registered" };
};

const getCustomerDetail = async (customerId) => {
  //Data Access Call
  const customerData = await Customer.findOne({ customerId: customerId });
  if (customerData == null) {
    throw { Status: "ERROR", StatusCode: 404, Message: "No Customer matching this Customer ID" };
  }
  logger.info("User Details on Customer ID-" + customerId + " was fetched Successfully");
  return { Status: "SUCCESS", StatusCode: 201, Message: "User Details on Customer ID-" + customerId + " was fetched Successfully", Response: customerData };
};

const updateCustomerDetail = async (customerId, body) => {
  //Joi Validation
  const { error, value } = await updateCustomerSchema.validateAsync(body);
  if (error) {
    throw { Status: "ERROR", StatusCode: 302, Message: error.message };
  }

  //Data Access Call
  var check = await Customer.findOne({ customerId: customerId });
  if (check == null) {
    throw { Status: "ERROR", StatusCode: 404, Message: "No Customer matching this Customer ID" };
  }
  const customers = await Customer.updateOne(
    { customerId: customerId },
    {
      $set: { location: body.location, customerName: body.customerName }
    },
    { new: true }
  );
  logger.info("User Details on Customer ID-" + body.customerId + ", updated Successfully");
  return { Status: "SUCCESS", StatusCode: 201, Message: "User Details on Customer ID-" + body.customerId + " was updated Successfully" };
};

const deactivateUser = async (customerId) => {
  //Data Access Call
  var check = await Customer.findOne({ customerId: customerId });
  if (check == null) {
    throw { Status: "ERROR", StatusCode: 404, Message: "No Customer matching this Customer ID", acknowledged: false };
  }
  const customers = await Customer.deleteOne({ customerId: customerId });
  const users = await User.deleteOne({ customerId: customerId });
  logger.info("User with Customer ID-" + customerId + " has been Deactivated.");
  return { Status: "SUCCESS", StatusCode: 200, Message: "User with Customer ID-" + customerId + " has been Deactivated." };
};

module.exports = { loginUser, registerUser, getCustomerDetail, updateCustomerDetail, deactivateUser };
