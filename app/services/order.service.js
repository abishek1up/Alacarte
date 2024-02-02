// Business logic
// Database etc
const { logger } = require("../config/winston");
const Order = require("../models/order");
const axios = require("axios");
const { loginSchema, checkTotalAmountSchema, otherID, orderId2 } = require("../models/validation");

const getAllMyOrders = async (customerId) => {
  //Joi Validation
  const { error, value } = await otherID.validateAsync(customerId);
  if (error) {
    throw { Status: "ERROR", StatusCode: 302, Message: error.message };
  }

  //Data Layer Call
  const orders = await Order.find({ customerId: customerId });
  if (orders == null) {
    throw { Status: "ERROR", StatusCode: 400, Message: "No Orders matching this Customer ID" };
  }
  return orders;
};

const getOrder = async (orderId) => {
  //Joi Validation
  const { error, value } = await orderId2.validateAsync(orderId);
  if (error) {
    throw { Status: "ERROR", StatusCode: 302, Message: error.message };
  }

  //Data Layer Call
  const orders = await Order.findOne({ orderId: orderId });
  if (orders == null) {
    throw { Status: "ERROR", StatusCode: 400, Message: "No Order matching this Order ID" };
  }
  return orders;
};

const placeOrder = async (body) => {
  //Joi Validation
  const { error, value } = await checkTotalAmountSchema.validateAsync(body);
  if (error) {
    throw { Status: "ERROR", StatusCode: 302, Message: error.message };
  }

  //Data Layer Call
  //Check Customer ID and Restaurant ID
  /*   const checkValid = await checkValid(req.body.customerId, req.body.restaurantId, req.headers["authorization"]);
  if (!checkValid.acknowledged) {
    throw { Status: "ERROR", StatusCode: 400, Message: "No Order matching this Order ID" };
  }

  //Check total Amout and Order Items
  const totalAmountData = await checkTotalAmount(req.body.OrderItems, req.body.restaurantId, checkValid.acknowledged);
  if (!checkValid.acknowledged) {
    throw { Status: "ERROR", StatusCode: 400, Message: "No Order matching this Order ID" };
  } */

  var orders = await Order.create({ restaurantId: body.restaurantId, customerId: body.customerId, OrderItems: body.OrderItems });
  if (orders != null) return { Status: "SUCCESS", StatusCode: 201, Message: "New Order Created", Details: orders };
};

const cancelOrder = async (orderId) => {
  //Joi Validation
  const { error, value } = await orderId2.validateAsync(orderId);
  if (error) {
    throw { Status: "ERROR", StatusCode: 302, Message: error.message };
  }

  //Data Layer Call
  var check = await Order.findOne({ orderId: orderId });
  if (check == null) {
    throw { Status: "ERROR", StatusCode: 404, Message: "No Customer matching this Customer ID", acknowledged: false };
  }

  const orders = await Order.deleteOne({ orderId: orderId });
  return { Status: "SUCCESS", StatusCode: 200, acknowledged: orders.acknowledged };
};

const checkValid = async (customerId, restaurantId, tokenHeader) => {
  var checkCustomer = await axios
    .get("http://localhost:8082/customer/" + customerId, {
      headers: {
        Authorization: tokenHeader //the token is a variable which holds the token
      }
    })
    .then(function (response) {
      if (response.status != 200) {
        throw { Status: "ERROR", StatusCode: 400, Message: "No Order matching this Order ID" };
      }
      return response;
    })
    .catch(function (error) {
      throw { Status: error.Status, StatusCode: error.StatusCode, Message: error.Message };
    });

  var checkRestaurant = await axios
    .get("http://localhost:8080/restaurants/" + restaurantId)
    .then(function (response) {
      if (response.status != 200) {
        throw { Status: "ERROR", StatusCode: 400, Message: "No Order matching this Order ID" };
      }
      return response;
    })
    .catch(function (error) {
      throw { Status: error.Status, StatusCode: error.StatusCode, Message: error.Message };
    });

  if (checkCustomer.status == 200 && checkRestaurant.status == 200) {
    return { Status: "SUCCESS", StatusCode: 200, acknowledged: true };
  }
  return { Status: "ERROR", acknowledged: false, Message: "Customer Service - " + checkCustomer.Message + ",StatusCode-" + checkCustomer.status + "|" + " Restaurant Service - " + checkRestaurant.Message + ",StatusCode-" + checkRestaurant.status };
};

const checkTotalAmount = async (orderItems, restaurantId, acknowledged) => {
  var checkRestaurant = await axios
    .get("http://localhost:8080/restaurants/" + restaurantId + "/menu")
    .then(async function (response) {
      var menuItems = response.data.items;
      var totalAmount = 0;
      var orderArray = [];
      for (var i = 0; i < orderItems.length; i++) {
        orderArray.push(menuItems.find((x) => x.item_Id == orderItems[i]));
        totalAmount += menuItems.find((x) => x.item_Id == orderItems[i]).item_Cost;
      }
      logger.info(totalAmount);

      //return totalAmount;
      return { Status: "SUCCESS", StatusCode: 200, acknowledged: true, totalAmount: totalAmount, orderArray: orderArray };
    })
    .catch(function (error) {
      throw { Status: "ERROR", StatusCode: 400, acknowledged: false, Message: error.message };
    });

  return checkRestaurant;
};

module.exports = { getAllMyOrders, getOrder, placeOrder, cancelOrder, checkValid, checkTotalAmount };
