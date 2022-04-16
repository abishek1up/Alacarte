const customerService = require("../services/customer.service")


module.exports = {
    registerUser : async (req, res) => {
        await customerService.registerUser(req.body)
        var customers = "Registered";
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(customers)
    },
  /*   getMyOrders : async (req, res) => {
        const customers = await customerService.getMyOrders()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(customers)
    }, */
    getCustomerDetail : async (req, res) => {
        const customers = await customerService.getCustomerDetail(req.params.cust_Id)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(customers)
    },
  /*   getOrderDetail : async (req, res) => {       
        const customers = await customerService.getOrderDetail()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(customers)
    }, */
    deactivateUser : async (req, res) => {
        const customers = await customerService.deactivateUser(req.params.cust_Id)
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(customers)
    }
}