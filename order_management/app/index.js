// to define express application

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const cors = require('cors')

const pool = require("../server");


const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

const orderRoutes = require('./routes/order.route')

const app = express()

app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

  app.listen(8080, ()=>{
          console.log("Server is running at 8080");
  });
app.use(cors())
app.use("/orders",jsonParser, orderRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app,pool;