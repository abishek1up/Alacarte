const orderService = require("../services/order.service")
const { loginSchema, checkTotalAmountSchema, otherID, order_Id } = require("../models/validation")
const logger = require("../config/winston")

module.exports = {
    getAllMyOrders: async (req, res) => {
        try {
            logger.info('Get All Orders of Customer ID-' + req.params.customerId);
            await otherID.validateAsync(req.params.customerId).then().catch(function (error) {
                let err = new Error("order_Id :" + error.message); err.status = 422; throw err;
            })

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
            logger.info('Get Order Details for Order ID-' + req.params.order_Id);
            await order_Id.validateAsync(req.params.order_Id).then().catch(function (error) {
                let err = new Error("order_Id :" + error.message); err.status = 422; throw err;
            })

            const orders = await orderService.getOrder(req.params.order_Id)
            if (orders.StatusCode == null) {
                logger.info('Fetch Successful for Order ID-' + req.params.order_Id);
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
            logger.info('Place Order for Customer ID-' + req.body.customerId + " on Restaurant ID-" + req.body.restaurant_Id);
            await checkTotalAmountSchema.validateAsync(req.body).then().catch(function (error) {
                let err = new Error(error.message); err.status = 422; throw err;
            })
            const checkValid = await orderService.checkValid(req.body.customerId, req.body.restaurant_Id, req.headers['authorization'])
            if (!checkValid.acknowledged) { let err = new Error(checkValid.Message); err.status = checkValid.StatusCode; throw err; }

            const totalAmountData = await orderService.checkTotalAmount(req.body.OrderItems, req.body.restaurant_Id, checkValid.acknowledged)
            if (!checkValid.acknowledged) { let err = new Error(totalAmountData.Message); err.status = totalAmountData.StatusCode; throw err; }

            const orders = await orderService.placeOrder(req.body, totalAmountData.acknowledged, totalAmountData.totalAmount, totalAmountData.orderArray)

            if (orders.StatusCode == 200) {
                logger.info('Order Placed Successful for Order ID-' + orders.order_Id);
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
    cancelOrder: async (req, res) => {
        try {
            logger.info('Cancel Order for Order ID-' + req.params.order_Id);
            await order_Id.validateAsync(req.params.order_Id).then().catch(function (error) {
                let err = new Error("order_Id :" + error.message); err.status = 422; throw err;
            })

            const check = await orderService.cancelOrder(req.params.order_Id)
            if (check.acknowledged) {
                logger.info('Delete Successful for Order ID-' + req.params.order_Id);
                return res.json(check);
            }
            else {
                logger.error('Error, StatusCode:' + check.StatusCode + " ,Message :" + check.message);
                res.status(check.status).json({ Status: 'ERROR', StatusCode: check.status, Message: check.message });
            }
        }
        catch (err) {
            logger.error('Error, StatusCode:' + err.status + " ,Message :" + err.message);
            res.status(err.status).json({ Status: 'ERROR', StatusCode: err.status, Message: err.message });
        }
    }

}