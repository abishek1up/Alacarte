// to define express application
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const express = require('express')
const cors = require('cors')
const reviewRoutes = require('./routes/review.route')

const app = express()

app.use(cors())
app.use("/reviews", jsonParser, reviewRoutes)

app.get("/health", (req, res) => {
    res.send("OK")
})



module.exports = app;