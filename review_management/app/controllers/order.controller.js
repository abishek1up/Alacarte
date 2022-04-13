const orderService = require("../services/order.service")


module.exports = {
    getOrders : async (req, res) => {
        const orders = await orderService.getOrders()
        res.json(orders)
    }
}