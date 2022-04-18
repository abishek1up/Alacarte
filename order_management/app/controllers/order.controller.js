const orderService = require("../services/order.service")


module.exports = {
    getOrders : async (req, res) => {
        const orders = await orderService.getOrders()
        res.json(orders)
    },
    getOrder2 : async (req, res) => {
        const orders = await orderService.getOrder2()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(orders)
    },
    getOrder : async (req, res) => {
        const orders = await orderService.getOrder(req.params.order_id)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(orders)
    },
    placeOrder : async (req, res) => {
        await orderService.placeOrder(req.body)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        const order = await orderService.getOrders()
        res.json(order)
    },
    cancelOrder : async (req, res) => {
        const check = await orderService.cancelOrder(req.params.order_id)
        if(check.acknowledged){
            res.statusCode = 200
            res.setHeader('Content-Type','application/json')
            res.json(check)
        }
    }

    
}