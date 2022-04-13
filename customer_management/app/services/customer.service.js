// Business logic
// Database etc 

const Customer = require("../models/customer")

module.exports = {
    // params is object, for parameters from controllers
    registerUser: async (params) => {
        const customers = await Customer.find().exec()
        return customers
    },
    getMyOrders: async (params) => {
        const orders = await Order.find().exec()
        return orders
    },
    getCustomerDetail: async (Id) => {
        const orders = await Order.findOne({_id:Id})
        return orders
    },
    getOrderDetail: async (body) => {
        const orders = await Order.create(body)
        return orders
    },
    deactivateUser: async (Id) => {
        const orders = await restaurant.deleteOne({_id:Id})
        return orders
    }
}