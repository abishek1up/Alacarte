
var mongoose = require("mongoose");
require("dotenv").config()

require("../models/review");
 

async function connectMongo() {
    const MONGO_URL= 
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
 
    return await mongoose.connect(MONGO_URL);
}


const client = require('amqplib/callback_api')
const url = process.env.RABBIT_MQ_URL

function bail(err) {
    console.error(err);
    process.exit(1);
  }

function publish_review(conn, data) {
    conn.createChannel(on_open);
    function on_open(err, ch) {
      if (err != null) bail(err);
      ch.assertQueue("HOTEL");
      ch.sendToQueue("HOTEL", Buffer.from(JSON.stringify(data)));
    }
  }


module.exports = { 
    connectMongo,
  client,
  publish_review
}