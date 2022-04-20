
var mongoose = require("mongoose");
require("dotenv").config()
require("../models/restaurant");
var services = require("../services/restaurant.service")

const client = require('amqplib/callback_api')
const url = process.env.RABBIT_MQ_URL

async function connectMongo() {
    const MONGO_URL =
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

    return await mongoose.connect(MONGO_URL);
}

function bail(err) {
    console.error(err);
    process.exit(1);
}

function consumer(conn) {
    var ok = conn.createChannel(on_open);
    function on_open(err, ch) {
        if (err != null) bail(err);
        ch.assertQueue("HOTEL");
        ch.consume("HOTEL", function (msg) {
            if (msg !== null) {
                const content = msg.content.toString()
                const data = JSON.parse(content)
                services.updateRestaurantRating(data.restaurant_id,data.avg_rating)
                console.log(data.restaurant_id);
                console.log(data.avg_rating);
                ch.ack(msg);
            }
        });
    }
}



client
    .connect(url, function (err, conn) {
        if (err != null) bail(err);
        console.log("Connected , Starting consumer")
        consumer(conn);
    });

module.exports = {
    connectMongo,
    bail,
    consumer,
    client
}