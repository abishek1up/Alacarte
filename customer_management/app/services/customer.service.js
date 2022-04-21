// Business logic
// Database etc 

const Customer = require("../models/customer")
const User = require("../models/user")
const jwt = require("jsonwebtoken");

module.exports = {
    loginUser: async (body) => {
        if (Object.keys(body).length !== 0) {
            const { email, password } = body;
            const user = await User.findOne({ email });
            var tokenT = "";
            if (!user) {
                return { Status: "Fail", StatusCode: 404, message: "User doesn't exist. Please register." };
            }
            else if (password !== user.password) {
                return { Status: "Fail", StatusCode: 401, message: "Unauthorized : Password Incorrect" };
            }
            else {
                const payload = {
                    email,
                    name: user.name
                };
                var token = await jwt.sign(payload, "secret", { expiresIn: 5, });
                return { Status: "SUCCESS", StatusCode: 200, message: "User Logged in Successfully.", accessToken: token };;
            }
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    registerUser: async (body) => {
        if (Object.keys(body).length !== 0) {
            const { email, password, customerName, location: { city, state } } = body;
            const userExists = await User.findOne({ email });

            if (userExists) {
                return { Status: "Fail", StatusCode: 400, Message: "User Email ID already exists" };
            }
            else {
                var users = await User.create({ email: body.email, password: body.password })
                    .then(function (newUser) {
                        console.log(newUser);                       
                        return { Status: "SUCCESS", StatusCode: 201, Message: "New User Registered", customerId : newUser.customerId };
                    })
                    .catch(function (err) {
                        console.log("check", err.name)
                        if (err.name == 'ValidationError') {
                            console.log("check", err.name)
                            return { Status: "ERROR", StatusCode: 422, Message: err.message }
                        } else {
                            return { Status: "ERROR", StatusCode: 500, Message: err.message }
                        }
                    })
                return users;
            }
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    registerCustomer: async (body,newUser) => {
        if (Object.keys(body).length !== 0) {

            var et = await Customer.create({ customerName: body.customerName, customerId: newUser.customerId, location: { city: body.location.city, state: body.location.state } })
            return { Status: "SUCCESS", StatusCode: 201, Message: "New Customer Registered" };
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    getCustomerDetail: async (customerId) => {
        try {
            const customers = await Customer.findOne({ customerId: customerId })
            if (customers != null) {
                return customers
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Customer matching this Customer ID" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    updateCustomerDetail: async (customerId,body) => {
        if (Object.keys(body).length !== 0) {
            var check = await Customer.findOne({ customerId: customerId })
            if (check != null) {
                try {
                    const customers = await Customer.updateOne({ customerId: customerId }, { $set: { location: body.location, customerName: body.customerName } }, { new: true })
                    const customers2 = await Customer.findOne({ customerId: customerId })
                    return customers2

                }
                catch (err) {
                    return { Status: "ERROR", StatusCode: 400, Message: err.message };
                }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Customer matching this Customer ID" };
            }
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    deactivateUser: async (customerId) => {
        try {
            var check = await Customer.findOne({ customerId: customerId })
            if (check != null) {

                const customers = await Customer.deleteOne({ customerId: customerId })
                const users = await User.deleteOne({ customerId: customerId })
                return { Status: "SUCCESS", StatusCode: 200, Message: "USER Deactivated" }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Customer matching this Customer ID" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    }
}