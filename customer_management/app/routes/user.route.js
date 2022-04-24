const express = require("express");
const customerController = require("../controllers/customer.controller");
const  { authValidate, authInitialize } = require("../middleware/auth.middleware");

const userRoutes = express.Router()

// /orders is prefix from app/index.js 
userRoutes.post("/login", customerController.loginUser)
userRoutes.post("/register", customerController.registerUser)

module.exports = userRoutes