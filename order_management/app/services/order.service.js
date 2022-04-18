// Business logic
// Database etc 


const Order = require("../models/order")
const connectPostgres = require("../config/orderdb");

/* const Pool = require("pg").Pool

const pool = new Pool({
    user : "postgres",
    password : "tmp",
    database : "TestDB",
    host: "localhost",
    port: 5432
})

pool.connect(); */

module.exports = {
    // params is object, for parameters from controllers
    getOrders: async (params) => {
        const orders = await Order.find().exec()
        return orders
    },
    getOrder: async (Id) => {
        const orders = await Order.findOne({_id:Id})
        return orders
    },
    placeOrder: async (body) => {
        const orders = await Order.create(body)
        return orders
    },
    cancelOrder: async (Id) => {
        const orders = await Order.deleteOne({_id:Id})
        return orders
    },
    getOrder2: async (params) => {
        try {
            console.log("hey")
            const data = await Order.query(`SELECT * FROM ordertable`);
            return data; 
        } catch (error) {
            return error;
        }
    }
}