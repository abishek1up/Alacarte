const client = require('amqplib/callback_api')
require("dotenv").config()
const url = process.env.RABBIT_MQ_URL

function bail(err) {
    console.error(err);
    process.exit(1);
  }

function publish_review(conn, data) {
    conn.createChannel(on_open);
    function on_open(err, ch) {
      if (err != null) bail(err);
      ch.assertQueue("Restaurant QUEUE");
      ch.sendToQueue("Restaurant QUEUE", Buffer.from(JSON.stringify(data)));
    }
  }


module.exports = { 
  client,
  publish_review
}
