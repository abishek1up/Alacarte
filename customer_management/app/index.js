// to define express application

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const cors = require('cors')

const customerRoutes = require('./routes/customer.route')

const app = express()

app.use(cors())
app.use("/customer",jsonParser, customerRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;