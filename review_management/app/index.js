// to define express application
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const cors = require('cors')

const amqp = require("amqplib");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

const reviewRoutes = require('./routes/review.route')

const app = express()

var channel, connection;

app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use(cors())
app.use("/reviews", jsonParser, reviewRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;