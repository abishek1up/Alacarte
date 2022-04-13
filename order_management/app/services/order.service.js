// Business logic
// Database etc 

const Order = require("../models/order")

module.exports = {
    // params is object, for parameters from controllers
    getOrders: async (params) => {
        const orders = await Order.find().exec()
        return orders
    },
    getOrder: async (Id) => {
        const orders = await Order.findOne({_id:Id})
        return orders
    },
    placeOrder: async (body) => {
        const orders = await Order.create(body)
        return orders
    },
    cancelOrder: async (Id) => {
        const orders = await restaurant.deleteOne({_id:Id})
        return orders
    }
}