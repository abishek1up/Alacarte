require("dotenv").config()
const app = require('./app/index')
const http=require("http");
const connectMongo = require("./app/config/orderdb");
 
//express application
const server = http.createServer(app)

// we don't node.js to listen on port during unit testing
if (process.env.NODE_ENV !== "test"){
    const IP_ADDRESS = process.env.IP_ADDRESS || "0.0.0.0"
    const PORT = +process.env.PORT || 8080
    console.log("IP ADDR", IP_ADDRESS, "Port ", PORT)

    Promise.all( [
        connectMongo()
    ])
    .then ( results => {
        console.log("Mongo db Connected")
        server.listen(PORT, IP_ADDRESS, function(err){
   
            if (err)
                console.error("Could not listen ", err);
                return;
            });
        
            console.log("Working on port  ", PORT);
    })
    .catch(err => {
        console.log("Failed to connect db ", err)
        process.exit(-1)
    })

}



// for testing purpose
module.exports = server
