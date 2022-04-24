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
    placeOrder: async (customerId,restaurant_Id,body,acknowledged,totalAmount) => {
        try{
        if(!acknowledged) throw new Error('Errorrr')
        if (Object.keys(body).length !== 0) {
            var et = await Order.create({ restaurant_Id: restaurant_Id, customerId : customerId, OrderItems: body.OrderItems, total_amount: totalAmount })
            return { Status: "SUCCESS", StatusCode: 201, Message: "New Order Created" };
        }
        else {
            return { Status: "ERROR", StatusCode: 400, Message: "Empty Request Body" };
        }
    }
    catch (err) {
        return { Status: "ERROR", StatusCode: 400, acknowledged : false, Message:  err.message };
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
    checkValid: async (customerId, restaurant_id) => {
        try {
              var checkCustomer = await axios.get("http://localhost:8082/customer/" + customerId)
              .then(function (response) {
                return response.status;
              })
              .catch(function (error) {
                return { Status: "ERROR", StatusCode: 400, acknowledged : false, Message : error.message };
              })              

              var checkRestaurant = await axios.get("http://localhost:8080/restaurants/"+ restaurant_id)
              .then(function (response) {
                return response.status;
              })
              .catch(function (error) {
                return { Status: "ERROR", StatusCode: 400, acknowledged : false, Message : error.message };
              })

            if (checkCustomer == 200 && checkRestaurant == 200) {
                return { Status: "SUCCESS", StatusCode: 200 , acknowledged : true};
            } 
            return { Status: "ERROR", StatusCode: 400, acknowledged : false, Message:  "Error occured" };
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, acknowledged : false, Message:  err.message };
        }
    },
    checkTotalAmount: async (OrderItems, restaurant_Id, acknowledged) => {
        try {
            if(!acknowledged) throw new Error('Errorrr')
            var checkRestaurant = await axios.get("http://localhost:8080/restaurants/"+restaurant_Id+"/menu" )
              .then(async function (response) {
                 var items = response.data.items
                 var totalAmount = 0;
                    for(var i = 0;i<OrderItems.length;i++) 
                    {
                        totalAmount += items.find(x => x.item_Id == OrderItems[i]).item_Cost
                    };
                    console.log(totalAmount)
                 //   return totalAmount; 
                 return { Status: "SUCCESS", StatusCode: 200, acknowledged : true, totalAmount : totalAmount }; 
                })
                .catch(function (error) {
                    console.log(error.message)
                    return { Status: "ERROR", StatusCode: 400, acknowledged : false, Message:  error.message };
                })

                return checkRestaurant;
        }
        catch (err) {
            return { Status: "ERROR", StatusCode: 400, acknowledged : false, Message:  err.message };
        }
    }
}