// Business logic
// Database etc 

const Customer = require("../models/customer")
const User = require("../models/user")
const jwt = require("jsonwebtoken");

module.exports = {
    // params is object, for parameters from controllers
    loginUser: async (body) => {
        const { email, password } = body;
        const user = await User.findOne({ email });
        var tokenT = "";
        if (!user) {
            return { message: "User doesn't exist" };
        }
        else if (password !== user.password) {
            return { message: "Password Incorrect" };
        }
        else 
        {
            const payload = {
                   email,
                   name: user.name
            };
            
            
            var token = await jwt.sign(payload, "secret", { expiresIn: 5, }); 
            return { token: token };       
        }
    },
    registerUser: async (body) => {
        const { email, password, name } = body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return { message: "User already exists" };
        } 
        else {
            const newUser = new User({
                email,
                name,
                password,
            });
           newUser.save();
        return newUser;
        }
    },
    getCustomerDetail: async (cust_Id) => {
        try {
            const customers = await Customer.findOne({_id:cust_Id})
            if(customers != null){
            return customers
            }
            else {
                let message = "No customers matches with the Id";
                var res = {};
                res.statusCode = 400
                res.acknowledged = false
                res.json = {
                    success: false,
                    message: message,
                    }
                return res;
            } 
        }
        catch (err) {  
            console.log(err);
            let message = err.message;
            var res = { "statusCode" : 200 , "json":{}};
            res.statusCode = 400
            res.json = {
                success: false,
                message: message,
                }
            return res;
        }
    },
    deactivateUser: async (cust_Id) => {
        var et = await Customer.findById({_id:cust_Id})
        if(et != null){
        try {
        const customers = await Customer.deleteOne({_id:cust_Id})
        return customers
        }
        catch (err) {  let message = err.message;
            var res = { "statusCode" : 200 , "json":{}};
            res.statusCode = 400
            res.acknowledged = false
            res.json = {
                success: false,
                message: message,
                  }
            return res;
         }
        }
        else {
            let message = "No Customers match with the Id";
            var res = { "statusCode" : 200 , "json":{}};
            res.statusCode = 400
            res.acknowledged = false
            res.json = {
                success: false,
                message: message,
                  }
            return res;
        }
    }
}