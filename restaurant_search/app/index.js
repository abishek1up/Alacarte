// to define express application
require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const client =   require('amqplib/callback_api')

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

const cors = require('cors')
const restaurantRoutes = require('./routes/restaurant.route')

const app = express()

const url = process.env.RABBIT_MQ_URL

let port = 8080
//callback in case of error
function bail(err) {
    console.error(err);
    process.exit(1);
  }

  function consumer(conn) {
    var ok = conn.createChannel(on_open);
    function on_open(err, ch) {
      if (err != null) bail(err);
      ch.assertQueue("HOTEL");
      ch.consume("HOTEL", function(msg) {
        if (msg !== null) {
            const content = msg.content.toString()
            const data = JSON.parse(content)
        console.log (data.restaurant_id);
        console.log(data.avg_rating );
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  }
}



client
.connect(url, function(err, conn) {
  if (err != null) bail(err);
   console.log("Connected , Starting consumer")
  consumer(conn);
});

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