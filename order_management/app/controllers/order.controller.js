const orderService = require("../services/order.service")
var test = require('mongoose');

module.exports = {
    getOrder : async (req, res) => {
        const orders = await orderService.getOrder(req.params.order_Id)
        if(orders.StatusCode == null)
        return res.status(200).json(orders);
        else
        res.status(orders.StatusCode).json(orders);
    },
    placeOrder : async (req, res) => {
        const checkValid = await orderService.checkValid(req.params.customerId, req.params.restaurant_Id)
        const totalAmountData = await orderService.checkTotalAmount(req.body.OrderItems,req.params.restaurant_Id,checkValid.acknowledged)         
        const orders = await orderService.placeOrder(req.params.customerId,req.params.restaurant_Id,req.body,totalAmountData.acknowledged,totalAmountData.totalAmount)
        
        if(orders.StatusCode == null)
        return res.status(200).json(orders);
        else
        res.status(orders.StatusCode).json(orders);
    },
    cancelOrder : async (req, res) => {
        const check = await orderService.cancelOrder(req.params.order_Id)
        if (check.acknowledged) {
            return res.json(check);
        }
        else {
            return res.json(check);
        }
    }
    
}