// to define express application

const express = require('express')
const cors = require('cors')
const jsonParser = bodyParser.json()

const orderRoutes = require('./routes/order.route')

const app = express()

app.use(cors())
app.use("/orders",jsonParser, orderRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;