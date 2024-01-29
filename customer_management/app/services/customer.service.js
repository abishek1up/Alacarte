const Customer = require("../models/customer");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authValidate, authInitialize } = require("../middleware/auth.middleware");
const logger = require("../config/winston");
const { loginSchema, registerSchema, updateCustomerSchema, customerId } = require("../models/validation");

module.exports = {
  loginUser: async (body) => {
    const { error, value } = await loginSchema.validateAsync(body);
    if (error) {
      console.log({ Status: "ERROR", StatusCode: 302, Message: error.message });
    }
    console.log();
    const { email, password } = body;
    const data = await User.find({ email: email }).exec().then();
    console.log(data);
    if (!data) {
      console.log({ Status: "ERROR", StatusCode: 401, Message: "User not registered1" });
    }

    return { Status: "SUCCESS", StatusCode: 200, Message: "return" };
  },
  /*  loginUser: async (body) => {
    const { error, value } = await loginSchema.validateAsync(body);
    if (error) {
      throw { Status: "ERROR", StatusCode: 302, Message: error.message };
    }

    const { email, password } = body;
    const { data } = await User.find({ email: "abishek554@gmail.com" });
    console.log(data);
    if (!data) {
      throw { Status: "ERROR", StatusCode: 401, Message: "User not registered1" };
    }

    return { Status: "SUCCESS", StatusCode: 200, Message: "return" }; */
  /* 
      .exec()
      .then((user) => {
        console.log(user);
        if (!user) {
          throw { Status: "ERROR", StatusCode: 401, Message: "User not registered1" };
        } else {
          return { Status: "SUCCESS", StatusCode: 200, Message: "User Logged in Successfully." };
        }
      })
      .catch((error) => {
        throw { Status: "ERROR", StatusCode: 401, Message: "User not registered3" };
      });
    const payload = { email: email, password: password }; */

  /* var tokenGenerator = authInitialize(payload);
            if (!tokenGenerator.status) {
              throw {
                Status: "Fail",
                StatusCode: 401,
                message: "Token not generated",
                error_info: token,
              };
            }*/
  /*  return {
      Status: "SUCCESS",
      StatusCode: 200,
      Message: "User Logged in Successfully.",
      /*  accessToken: tokenGenerator.token,
              tokenExpiresIn: tokenGenerator.tokenExpiresIn, 
    }; */
  registerUser: async (body) => {
    const {
      email,
      password,
      customerName,
      location: { city, state },
    } = body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return {
        Status: "Fail",
        StatusCode: 409,
        Message: "User Email ID already exists",
      };
    } else {
      var users = await User.create({
        email: body.email,
        password: body.password,
      })
        .then(function (newUser) {
          return {
            Status: "SUCCESS",
            StatusCode: 201,
            Message: "New User Registered",
            customerId: newUser.customerId,
          };
        })
        .catch(function (err) {
          console.log("check", err.name);
          if (err.name == "ValidationError") {
            return { Status: "ERROR", StatusCode: 422, Message: err.message };
          } else {
            return { Status: "ERROR", StatusCode: 500, Message: err.message };
          }
        });
      return users;
    }
  },
  registerCustomer: async (body, newUser) => {
    var newCustomer = await Customer.create({
      customerName: body.customerName,
      customerId: newUser.customerId,
      location: { city: body.location.city, state: body.location.state },
    });
    return {
      Status: "SUCCESS",
      StatusCode: 201,
      Message: "New Customer Registered",
    };
  },
  getCustomerDetail: async (customerId) => {
    try {
      const customers = await Customer.findOne({ customerId: customerId });
      if (customers != null) {
        return customers;
      } else {
        return {
          Status: "ERROR",
          StatusCode: 404,
          Message: "No Customer matching this Customer ID",
        };
      }
    } catch (err) {
      return { Status: "ERROR", StatusCode: 400, Message: err.message };
    }
  },
  updateCustomerDetail: async (customerId, body) => {
    var check = await Customer.findOne({ customerId: customerId });
    if (check != null) {
      try {
        const customers = await Customer.updateOne(
          { customerId: customerId },
          {
            $set: { location: body.location, customerName: body.customerName },
          },
          { new: true }
        );
        const customers2 = await Customer.findOne({ customerId: customerId });
        return customers2;
      } catch (err) {
        return { Status: "ERROR", StatusCode: 400, Message: err.message };
      }
    } else {
      return {
        Status: "ERROR",
        StatusCode: 404,
        Message: "No Customer matching this Customer ID",
      };
    }
  },
  deactivateUser: async (customerId) => {
    try {
      var check = await Customer.findOne({ customerId: customerId });
      if (check != null) {
        const customers = await Customer.deleteOne({ customerId: customerId });
        const users = await User.deleteOne({ customerId: customerId });
        return {
          Status: "SUCCESS",
          StatusCode: 200,
          Message: "USER Deactivated",
          acknowledged: true,
        };
      } else {
        return {
          Status: "ERROR",
          StatusCode: 404,
          Message: "No Customer matching this Customer ID",
          acknowledged: false,
        };
      }
    } catch (err) {
      return {
        Status: "ERROR",
        StatusCode: 400,
        Message: err.message,
        acknowledged: false,
      };
    }
  },
};
