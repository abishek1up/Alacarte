const customerService = require("../services/customer.service")
const { loginSchema, registerSchema, updateCustomerSchema, customerId } = require("../models/validation")
const logger = require("../config/winston")

module.exports = {
    loginUser: async (req, res) => {
        try {
            logger.info('User login');
            await loginSchema.validateAsync(req.body)
            var users = await customerService.loginUser(req.body);
            return res.status(users.StatusCode).json(users);
        }
        catch (err) {
            logger.error(err.message);
            res.status(422).json({ message: err.message });
        }
    },
    registerUser: async (req, res) => {
        try {
            logger.info('User Registration');
            await registerSchema.validateAsync(req.body)
            var users = await customerService.registerUser(req.body);
            if (users.StatusCode == 201) {
                var customer = await customerService.registerCustomer(req.body, users);
            }
            return res.status(users.StatusCode).json(users);
        }
        catch (err) {
            logger.error(err.message);
            res.status(422).json({ message: err.message });
        }
    },
    getCustomerDetail: async (req, res) => {
        try {
            logger.info('Get User Details on Customer ID-'+ req.params.customerId);
            await customerId.validateAsync(req.params.customerId)
            const customers = await customerService.getCustomerDetail(req.params.customerId)
            if (customers.StatusCode == null) {
                logger.info('User Details on Customer ID-'+req.params.customerId+', fetched Successfully');
                return res.status(200).json(customers);
            }
            else
                res.status(customers.StatusCode).json(customers);
        }
        catch (err) {
            logger.error(err.message);
            res.status(422).json({ message: err.message });
        }
    },
    updateCustomerDetail: async (req, res) => {
        try {
            logger.info('Update User Details on Customer ID-'+ req.params.customerId);
            await customerId.validateAsync(req.params.customerId)
            await updateCustomerSchema.validateAsync(req.body)
            const customers = await customerService.updateCustomerDetail(req.params.customerId, req.body)
            if (customers.StatusCode == null) {
                logger.info('User Details on Customer ID-'+req.params.customerId+', updated Successfully');
                return res.status(200).json(customers);
            }
            else {
                return res.status(customers.StatusCode).json(customers);
            }
        }
        catch (err) {
            logger.error(err.message);
            res.status(422).json({ message: err.message });
        }
    },
    deactivateUser: async (req, res) => {
        try {
            logger.info('Delete User using Customer ID-'+ req.params.customerId);
            await customerId.validateAsync(req.params.customerId)
            const check = await customerService.deactivateUser(req.params.customerId)
            if (check.acknowledged) {
                logger.info('User on Customer ID-'+req.params.customerId+', deleted Successfully');
                return res.status(200).json(check);
            }
            else {
                return res.status(check.StatusCode).json(check);
            }
        }
        catch (err) {
            logger.error(err.message);
            res.status(422).json({ message: err.message });
        }
    }

}