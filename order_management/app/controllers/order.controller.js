const orderService = require("../services/order.service")


module.exports = {
    getOrders : async (req, res) => {
        const orders = await orderService.getOrders()
        res.json(orders)
    },
    getOrder : async (req, res) => {
        const orders = await orderService.getOrder(req.params.id)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(order)
    },
    placeOrder : async (req, res) => {
        const orders = await orderService.placeOrder(req.Body)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(orders)
    },
    cancelOrder : async (req, res) => {
        await orders.orderService(req.params.id)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        const orders = await orderService.getOrders()
        res.json(orders)
    }
}