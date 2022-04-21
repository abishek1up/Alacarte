const { expect } = require("chai");
const customerService = require("../services/customer.service")


module.exports = {
    loginUser: async (req, res) => {
        var users = await customerService.loginUser(req.body);
        return res.status(users.StatusCode).json(users);
    },
    registerUser: async (req, res) => {
        var users = await customerService.registerUser(req.body);
        if(users.StatusCode == 201) {
            var customer = await customerService.registerCustomer(req.body,users);
        }
        return res.status(users.StatusCode).json(users);
    },
    getCustomerDetail: async (req, res) => {
        const customers = await customerService.getCustomerDetail(req.params.customerId)
        if(customers.StatusCode == null)
        return res.status(200).json(customers);
        else
        res.status(customers.StatusCode).json(customers);
    },
    updateCustomerDetail: async (req, res) => {
        const customers = await customerService.updateCustomerDetail(req.params.customerId,req.body)
        if (customers.StatusCode == null) {
            return res.status(200).json(customers);
        }
        else {
            return res.status(customers.StatusCode).json(customers);
        }
    },
    deactivateUser: async (req, res) => {
        const check = await customerService.deactivateUser(req.params.customerId)
        if (check.acknowledged) {
            return res.status(200).json(check);
        }
        else {
            return res.status(check.StatusCode).json(check);
        }
    },
}