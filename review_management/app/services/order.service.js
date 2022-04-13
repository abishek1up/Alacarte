// Business logic
// Database etc 

const Order = require("../models/order")

module.exports = {
    // params is object, for parameters from controllers
    getOrders: async (params) => {
        const orders = await Order.find().exec()
        return orders
    }
}