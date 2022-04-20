// to define express application
require("dotenv").config()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const cors = require('cors')

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

/* const swaggerDocument_Customer = require('../swagger_Customer.json');
const swaggerDocument_User = require('../swagger_User.json'); */
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
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./swagger-docs/**/*.yaml'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// use swagger-Ui-express for your app documentation endpoint
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/* app.use(
    '/swagger-customer',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument_Customer)
  );
  
  app.use(
    '/swagger-user',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument_User)
  ); */

app.use(cors())

app.use("/user",jsonParser, userRoutes)
app.use("/customer",jsonParser, customerRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;