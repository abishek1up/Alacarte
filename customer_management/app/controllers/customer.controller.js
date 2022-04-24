const { expect } = require("chai");
const customerService = require("../services/customer.service")
const { loginSchema, registerSchema, updateCustomerSchema, customerId } = require("../models/validation")


module.exports = {
    loginUser: async (req, res) => {
        try {
            await loginSchema.validateAsync(req.body)
            var users = await customerService.loginUser(req.body);            
            return res.status(users.StatusCode).json(users);
        }
        catch (err) {
            res.status(422).json({ message: err.message });
        }
    },
    registerUser: async (req, res) => {
        try {
            await registerSchema.validateAsync(req.body)
            var users = await customerService.registerUser(req.body);
            if (users.StatusCode == 201) {
                var customer = await customerService.registerCustomer(req.body, users);
            }
            return res.status(users.StatusCode).json(users);
        }
        catch (err) {
            res.status(422).json({ message: err.message });
        }
    },
    getCustomerDetail: async (req, res) => {
        try {
            await customerId.validateAsync(req.params.customerId)
            const customers = await customerService.getCustomerDetail(req.params.customerId)
            if (customers.StatusCode == null)
                return res.status(200).json(customers);
            else
                res.status(customers.StatusCode).json(customers);
        }
        catch (err) {
            res.status(422).json({ message: err.message });
        }
    },
    updateCustomerDetail: async (req, res) => {
        try {
            await customerId.validateAsync(req.params.customerId)
            await updateCustomerSchema.validateAsync(req.body)
            const customers = await customerService.updateCustomerDetail(req.params.customerId, req.body)
            if (customers.StatusCode == null) {
                return res.status(200).json(customers);
            }
            else {
                return res.status(customers.StatusCode).json(customers);
            }
        }
        catch (err) {
            res.status(422).json({ message: err.message });
        }
    },
    deactivateUser: async (req, res) => {
        try {
            await customerId.validateAsync(req.params.customerId)
            const check = await customerService.deactivateUser(req.params.customerId)
            if (check.acknowledged) {
                return res.status(200).json(check);
            }
            else {
                return res.status(check.StatusCode).json(check);
            }
        }
        catch (err) {
            res.status(422).json({ message: err.message });
        }
    }

}