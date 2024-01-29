const app = require('./app/index')
const http=require("http");
const retrieve = require("./app/config/restaurantdb");
require("dotenv").config()
const logger = require("./app/config/winston")
const server = http.createServer(app)
const rabbitMQ = require("./app/middleware/consumer.middleware")

if (process.env.NODE_ENV == "prod"){
    const IP_ADDRESS = process.env.IP_ADDRESS || "0.0.0.0"
    const PORT = +process.env.PORT || 8080
    logger.info("IP Address:"+IP_ADDRESS +", Port:"+ PORT);  
    logger.info("PROD ENV Connected"); 
    Promise.all( [
        retrieve.connectMongo()
    ])
    .then ( results => {
        logger.info("Mongo, Restaurant DB Connected");
        server.listen(PORT, IP_ADDRESS, function(err){
   
            if (err)
            logger.error("Could not listen "+err);
                return;
            });
        
            logger.info("Working on PORT - "+PORT);
    })
    .catch(err => {
        logger.error("Failed to connect DB "+err)
        process.exit(-1)
    })

}
else if (process.env.NODE_ENV == "test"){
    const IP_ADDRESS = process.env.IP_ADDRESS || "0.0.0.0"
    const PORT = +process.env.PORT || 8080
    logger.info("IP Address:"+IP_ADDRESS +", Port:"+ PORT)
    logger.info("TEST ENV Connected")

    Promise.all( [
        connectMongo()
    ])
    .then ( results => {
        logger.info("Mongo, Restaurant DB Connected");  
        /* server.listen(PORT, IP_ADDRESS, function(err){
   
            if (err)
                console.error("Could not listen ", err);
                return;
            }); */        
           
            logger.info("Working on PORT - "+PORT);
    })
    .catch(err => {
        logger.error("Failed to connect DB ", err)
        process.exit(-1)
    })

}

module.exports = server
