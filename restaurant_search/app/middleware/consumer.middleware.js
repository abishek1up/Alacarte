const client = require('amqplib/callback_api');
const logger = require("../config/winston");
require("dotenv").config()
const url = process.env.RABBIT_MQ_URL
const services = require("../services/restaurant.service")

function bail(err) {
    console.error(err);
    process.exit(1);
}

function consumer(conn) {
    var ok = conn.createChannel(on_open);
    function on_open(err, ch) {
        if (err != null) bail(err);
        ch.assertQueue("Restaurant QUEUE");
        ch.consume("Restaurant QUEUE", function (msg) {
            if (msg !== null) {
                const content = msg.content.toString()
                const data = JSON.parse(content)  
                console.log(data)            
                var restaurants = services.updateRestaurantRating(data.restaurantId,data.avg_rating,data.totalRatings)
                if(restaurants.statusCode != 400){
                    console.log("Connected , Review Data Consumed by Resaturant Consumer")
                }
                ch.ack(msg);
            }
        });
    }
}



client
    .connect(url, function (err, conn) {
        if (err != null) bail(err);
        logger.info("Connected , Starting Resaturant Consumer")
        consumer(conn);
    });


module.exports = {    
    bail,
    consumer,
    client
}    