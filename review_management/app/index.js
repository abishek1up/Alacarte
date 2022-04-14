// to define express application

const express = require('express')
const cors = require('cors')
const reviewRoutes = require('./routes/reviews.route')

const app = express()

app.use(cors())
app.use("/reviews", reviewRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;