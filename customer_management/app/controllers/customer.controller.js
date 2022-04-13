const orderService = require("../services/customer.service")


module.exports = {
    registerUser : async (req, res) => {
        const customers = await customerService.registerUser(req.Body)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(customers)
    },
    getMyOrders : async (req, res) => {
        const customers = await customerService.getMyOrders()
        res.json(customers)
    },
    getCustomerDetail : async (req, res) => {
        const customers = await customerService.getCustomerDetail(req.params.id)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(customers)
    },
    getOrderDetail : async (req, res) => {       
        const customers = await customerService.getOrderDetail()
        res.json(customers)
    },
    deactivateUser : async (req, res) => {
        const customers = await customerService.deactivateUser()
        res.json(customers)
    }
}