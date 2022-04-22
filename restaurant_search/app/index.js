// to define express application

const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const axios = require('axios')
const redis = require('redis')

const responseTime = require('response-time')
const { promisify } = require('util')

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

const cors = require('cors')
const restaurantRoutes = require('./routes/restaurant.route')

const app = express()

app.use(responseTime())

app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use(cors())
app.use("/restaurants", jsonParser, restaurantRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;