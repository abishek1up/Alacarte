
var mongoose = require("mongoose");
require("dotenv").config()

module.exports = async function connectMongo() {
    const MONGO_URL= 
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
 
    return mongoose.connect(MONGO_URL);
}