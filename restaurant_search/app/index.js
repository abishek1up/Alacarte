// to define express application
require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const amqp = require("amqplib");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

const cors = require('cors')
const restaurantRoutes = require('./routes/restaurant.route')

const app = express()

let port = 1234;

var channel, connection;

async function connect() {
    const amqpServer = RABBIT;
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("RESTAURANT");
}
connect().then(() => {
    channel.consume("RESTAURANT", (data) => {
        console.log("Consuming RESTAURANT service");
        const { products, userEmail } = JSON.parse(data.content);
        const newOrder = createOrder(products, userEmail);
        channel.ack(data);
        channel.sendToQueue(
            "REVIEW",
            Buffer.from(JSON.stringify({ newOrder }))
        );
    });
});


app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.use(cors())
app.use("/restaurants", jsonParser, restaurantRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;