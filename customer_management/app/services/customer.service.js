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
                return { Status: "Fail", StatusCode: 404, message: "User doesn't exist" };
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
            const { email, password, name } = body;
            const userExists = await User.findOne({ email });
            if (userExists) {
                return { Status: "Fail", StatusCode: 400, Message: "User Email ID already exists" };
            }
            else {
                const newUser = new User({
                    email,
                    name,
                    password,
                });
                newUser.save();
                return { Status: "ERROR", StatusCode: 201, Message: "User Registered Successfully." };
            }
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
    updateCustomerDetail: async (customerId) => {
        if (Object.keys(body).length !== 0) {
            var check = await Customer.findOne({ customerId: customerId })
            if (check != null) {
                try {
                    const customers = await Customer.updateOne({ customerId: customerId }, { $set: body }, { new: true })
                    return customers

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
                return customers,users
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