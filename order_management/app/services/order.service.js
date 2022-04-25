// Business logic
// Database etc 
const logger = require("../config/winston")
const Order = require("../models/order")
const connectPostgres = require("../config/orderdb");
const axios = require('axios');
const { AxiosResponse, AxiosError } = require('axios');
module.exports = {

    getAllMyOrders: async (customerId) => {
        try {
            const orders = await Order.find({ customerId: customerId })
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
    placeOrder: async (body, acknowledged, totalAmount, orderArray) => {
        try {
            if (!acknowledged) throw new Error('Restaurant ID or Customer ID is Invalid')
            if (Object.keys(body).length !== 0) {

                var orders = await Order.create({ restaurant_Id: body.restaurant_Id, customerId: body.customerId, OrderItems: orderArray, total_amount: totalAmount })
                if (orders != null)
                    return { Status: "SUCCESS", StatusCode: 201, Message: "New Order Created" };
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, acknowledged: false, Message: err.message };
        }
    },
    cancelOrder: async (order_Id) => {
        try {
            var check = await Order.findOne({ order_Id: order_Id })
            console.log(check)
            if (check != null) {
                const orders = await Order.deleteOne({ order_Id: order_Id })
                if (orders != null)
                    return { Status: "SUCCESS", StatusCode: 200, acknowledged: orders.acknowledged }
            }
            else {
                return { Status: "ERROR", StatusCode: 400, Message: "No Customer matching this Customer ID", acknowledged: false };
            }
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, Message: err.message, acknowledged: false };
        }
    },
    checkValid: async (customerId, restaurant_id, tokenHeader) => {
        try {
            var checkCustomer = await axios.get("http://localhost:8082/customer/" + customerId, {
                headers: {
                    Authorization: tokenHeader //the token is a variable which holds the token
                }
            })
                .then(function (response) {
                    if (response.status != 200) { let err = new Error(response.Message); err.status = response.status; throw err; }
                    return response;
                })
                .catch(function (error) {
                    let err = new Error(error.response.data.Message); err.status = error.response.status; throw err;
                })

            var checkRestaurant = await axios.get("http://localhost:8080/restaurants/" + restaurant_id)
                .then(function (response) {
                    if (response.status != 200) { let err = new Error(response.Message); err.status = response.status; throw err; }
                    return response;
                })
                .catch(function (error) {
                    let err = new Error(error.response.data.Message); err.status = error.response.status; throw err;
                })

            if (checkCustomer.status == 200 && checkRestaurant.status == 200) {
                return { Status: "SUCCESS", StatusCode: 200, acknowledged: true };
            }
            return { Status: "ERROR", acknowledged: false, Message: "Customer Service - " + checkCustomer.Message + ",StatusCode-" + checkCustomer.status + "|" + " Restaurant Service - " + checkRestaurant.Message + ",StatusCode-" + checkRestaurant.status };
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: err.status, acknowledged: false, Message: err.message };
        }
    },
    checkTotalAmount: async (orderItems, restaurant_Id, acknowledged) => {
        try {
            if (!acknowledged) throw new Error('Errorrr')
            var checkRestaurant = await axios.get("http://localhost:8080/restaurants/" + restaurant_Id + "/menu")
                .then(async function (response) {
                    var menuItems = response.data.items
                    var totalAmount = 0;
                    var orderArray = [];
                    for (var i = 0; i < orderItems.length; i++) {
                        orderArray.push(menuItems.find(x => x.item_Id == orderItems[i]));
                        totalAmount += menuItems.find(x => x.item_Id == orderItems[i]).item_Cost
                    };
                    logger.info(totalAmount)

                    //   return totalAmount; 
                    return { Status: "SUCCESS", StatusCode: 200, acknowledged: true, totalAmount: totalAmount, orderArray: orderArray };
                })
                .catch(function (error) {
                    console.log(error.message)
                    return { Status: "ERROR", StatusCode: 400, acknowledged: false, Message: error.message };
                })

            return checkRestaurant;
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, acknowledged: false, Message: err.message };
        }
    }
}