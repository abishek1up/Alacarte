const orderService = require("../services/order.service");
const logger = require("../config/winston");
const tryCatchHandler = require("../utils/tryCatchHandler.util");

exports.getAllMyOrders = tryCatchHandler(async (req, res) => {
  logger.info("Get All Orders of Customer ID-" + req.params.customerId);

  //Service Layer Call
  const orders = await orderService.getAllMyOrders(req.params.customerId);
  logger.info("Fetch Successful for Customer ID-" + req.params.customerId);
  res.status(200).json(orders);
});

exports.getOrder = tryCatchHandler(async (req, res) => {
  logger.info("Get Order Details for Order ID-" + req.params.orderId);

  //Service Layer Call
  const orders = await orderService.getOrder(req.params.orderId);
  logger.info("Fetch Successful for Order ID-" + req.params.orderId);
  res.status(200).json(orders);
});

exports.placeOrder = tryCatchHandler(async (req, res) => {
  logger.info("Place Order for Customer ID-" + req.body.customerId + " on Restaurant ID-" + req.body.restaurantId);

  //Service Layer Call
  const orders = await orderService.placeOrder(req.body, totalAmountData.acknowledged, totalAmountData.totalAmount, totalAmountData.orderArray);
  res.status(201).json(orders);
});
exports.cancelOrder = tryCatchHandler(async (req, res) => {
  logger.info("Cancel Order for Order ID-" + req.params.orderId);

  //Service Layer Call
  const orders = await orderService.cancelOrder(req.params.orderId);
  res.json(orders);
});
