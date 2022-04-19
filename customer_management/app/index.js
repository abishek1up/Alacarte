// to define express application

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const cors = require('cors')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');
const app = express()
const jwt = require("jsonwebtoken");

const customerRoutes = require('./routes/customer.route')
const userRoutes = require('./routes/user.route')


app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use(cors())

app.use("/users",jsonParser, userRoutes)
app.use("/customers",jsonParser, customerRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;