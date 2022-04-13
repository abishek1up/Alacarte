// to define express application
const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

const cors = require('cors')
const restaurantRoutes = require('./routes/restaurant.route')

const app = express()

let port = 1234;

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