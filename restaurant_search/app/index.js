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

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
})

let port = 8080
//callback in case of error


app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

app.use(cors())
app.use("/restaurants", jsonParser, restaurantRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;