// Business logic
// Database etc 

const Customer = require("../models/customer")

module.exports = {
    // params is object, for parameters from controllers
    registerUser: async (body) => {
            const customers = await Customer.create(body)
            return customers
    },
/*     getMyOrders: async (params) => {
        const customers = await Customer.find().exec()
        return customers
    }, */
    getCustomerDetail: async (Id) => {
        const customers = await Customer.findOne({_id:Id})
        return customers
    },
  /*   getOrderDetail: async (body) => {
        const customers = await Customer.create(body)
        return customers
    }, */
    deactivateUser: async (Id) => {
        const customers = await Customer.deleteOne({_id:Id})
        return customers
    }
}