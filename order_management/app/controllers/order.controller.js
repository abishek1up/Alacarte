const orderService = require("../services/order.service")


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
        if(checkValid.acknowledged){
            const orders = await orderService.placeOrder(req.body)
            res.status(200).json(orders)
        }
        else{
            res.status(400).json(checkValid)
        } 
    },
    cancelOrder : async (req, res) => {
        const check = await orderService.cancelOrder(req.params.customerId)
        if (check.acknowledged) {
            return res.status(200).json(check);
        }
        else {
            return res.status(check.StatusCode).json(check);
        }
    }
    
}