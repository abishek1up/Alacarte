// to define express application

const express = require('express')
const cors = require('cors')
const customerRoutes = require('./routes/customer.route')

const app = express()

app.use(cors())
app.use("/customer", customerRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;