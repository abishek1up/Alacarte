// to define express application
require("dotenv").config()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const cors = require('cors')

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

const app = express()
const jwt = require("jsonwebtoken");

const customerRoutes = require('./routes/customer.route')
const userRoutes = require('./routes/user.route')

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'Customer Management Services', 
    version: '1.0.0',
    description: 'Customer Management Services',
  },
  host: 'localhost:'+process.env.PORT, 
  basePath: '/', 
};

const options = {
  swaggerDefinition,
  apis: ['./swagger-docs/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors())

app.use("/user",jsonParser, userRoutes)
app.use("/customer",jsonParser, customerRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;