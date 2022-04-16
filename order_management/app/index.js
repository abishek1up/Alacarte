// to define express application

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const cors = require('cors')

const orderRoutes = require('./routes/order.route')

const app = express()

app.use(cors())
app.use("/orders",jsonParser, orderRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;