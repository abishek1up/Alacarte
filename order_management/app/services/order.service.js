// Business logic
// Database etc 


const Order = require("../models/order")
const connectPostgres = require("../config/orderdb");
const axios = require('axios');

module.exports = {
    // params is object, for parameters from controllers

    getOrder: async (order_Id) => {
        try {
            const orders = await Order.findOne({ order_Id: order_Id })
            if (orders != null) {
                return orders
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Order matching this Order ID" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    placeOrder: async (body) => {
        if (Object.keys(body).length !== 0) {
            var et = await Order.create(body)
            return { Status: "SUCCESS", StatusCode: 201, Message: "New Order Created" };
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    },
    cancelOrder: async (order_Id) => {
        try {
            var check = await Order.findOne({ order_Id: order_Id })
            if (check != null) {
                const orders = await Order.deleteOne({ order_Id: order_Id })
                return { Status: "SUCCESS", StatusCode: 200, acknowledged: orders.acknowledged }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Customer matching this Customer ID" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message };
        }
    },
    checkValid: async (customerId, id) => {
        try {
             var checkCustomer = await axios.get("http://localhost:8082/customer/" + customerId)
              .then(function (response) {
                return response.status;
              })
              .catch(function (error) {
                return response.status;
              }) 

            var checkRestaurant = await axios.get("http://localhost:8080/restaurants/"+id )
              .then(async function (response) {
                return response.status;
                })
                .catch(async function (error) {
                    return error.message;
                })
  
            if (checkCustomer == 200 && checkRestaurant == 200) {
                return { Status: "SUCCESS", StatusCode: 200 , acknowledged : true};
            } 
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message:  err.message };
        }
    }
}