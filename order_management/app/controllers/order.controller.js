const orderService = require("../services/order.service")
const { loginSchema, checkTotalAmountSchema, otherID, orderId } = require("../models/validation")
const logger = require("../config/winston")

module.exports = {
    getAllMyOrders: async (req, res) => {
        try {
            logger.info('Get All Orders of Customer ID-' + req.params.customerId);

             //Joi Validation
            await otherID.validateAsync(req.params.customerId).then().catch(function (error) {
                let err = new Error("orderId :" + error.message); err.status = 422; throw err;
            })

             //Service Layer Call
            const orders = await orderService.getAllMyOrders(req.params.customerId)
            if (orders.StatusCode == null) {
                logger.info('Fetch Successful for Customer ID-' + req.params.customerId);
                return res.status(200).json(orders);
            }
            else {
                logger.error('Error, StatusCode:' + orders.StatusCode + " ,Message :" + orders.message);
                res.status(orders.StatusCode).json(orders);
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    getOrder: async (req, res) => {
        try {
            logger.info('Get Order Details for Order ID-' + req.params.orderId);

             //Joi Validation
            await orderId.validateAsync(req.params.orderId).then().catch(function (error) {
                let err = new Error("orderId :" + error.message); err.status = 422; throw err;
            })

             //Service Layer Call
            const orders = await orderService.getOrder(req.params.orderId)
            if (orders.StatusCode == null) {
                logger.info('Fetch Successful for Order ID-' + req.params.orderId);
                return res.status(200).json(orders);
            }
            else {
                logger.error('Error, StatusCode:' + orders.StatusCode + " ,Message :" + orders.message);
                res.status(orders.StatusCode).json(orders);
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    placeOrder: async (req, res) => {
        try {
            logger.info('Place Order for Customer ID-' + req.body.customerId + " on Restaurant ID-" + req.body.restaurantId);

             //Joi Validation
            await checkTotalAmountSchema.validateAsync(req.body).then().catch(function (error) {
                let err = new Error(error.message); err.status = 422; throw err;
            })

             //Check Customer ID and Restaurant ID
            const checkValid = await orderService.checkValid(req.body.customerId, req.body.restaurantId, req.headers['authorization'])
            if (!checkValid.acknowledged) { let err = new Error(checkValid.Message); err.status = checkValid.StatusCode; throw err; }

            //Check total Amout and Order Items
            const totalAmountData = await orderService.checkTotalAmount(req.body.OrderItems, req.body.restaurantId, checkValid.acknowledged)
            if (!checkValid.acknowledged) { let err = new Error(totalAmountData.Message); err.status = totalAmountData.StatusCode; throw err; }

            //Service Layer Call
            const orders = await orderService.placeOrder(req.body, totalAmountData.acknowledged, totalAmountData.totalAmount, totalAmountData.orderArray)

            if (orders.StatusCode == 201) {
                logger.info('Order Placed Successful for Order ID-' + orders.Details.orderId);
                res.status(201).json(orders);
            }
            else {
                logger.error('Error, StatusCode:' + orders.StatusCode + " ,Message :" + orders.message);
                res.status(orders.StatusCode).json(orders);
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    },
    cancelOrder: async (req, res) => {
        try {
            logger.info('Cancel Order for Order ID-' + req.params.orderId);

             //Joi Validation
            await orderId.validateAsync(req.params.orderId).then().catch(function (error) {
                let err = new Error("orderId :" + error.message); err.status = 422; throw err;
            })

            //Service Layer Call
            const check = await orderService.cancelOrder(req.params.orderId)
            if (check.acknowledged) {
                logger.info('Delete Successful for Order ID-' + req.params.orderId);
                res.json(check);
            }
            else {
                logger.error('Error, StatusCode:' + check.StatusCode + " ,Message :" + check.Message);
                res.status(check.StatusCode).json({ Status: 'ERROR', StatusCode: check.StatusCode, Message: check.Message });
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    }

}