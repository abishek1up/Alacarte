const express = require("express");
const customerController = require("../controllers/customer.controller");


const userRoutes = express.Router()

// /orders is prefix from app/index.js 
userRoutes.post("/login", customerController.loginUser)
userRoutes.post("/register", customerController.registerUser)

module.exports = userRoutes