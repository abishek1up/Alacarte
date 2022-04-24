const express = require("express");
const jsonServer = require('json-server')
//const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');
const ejs = require("ejs");
const path = require("path");
const bodyParser = require('body-parser')
const moment = require('moment');

const app = jsonServer.create()

var expiryInMinutes = 1;

app.set('jwtTokenSecret', 'yX!fglBbZr');

app.use(bodyParser.json());

app.get("/validate/token", validateToken, (req, res) => {
    res.json({valid: true})
})
app.post('/oauth/token', authInitialize);

app.get("/health", (req, res) => {
    res.send("OK")
})

function validateToken(req, res) {
    console.log("Validating token");
    
    var token = req.headers["x-auth-token"];
    if (!token) {
        if (req.headers["authorization"]) {
            token = req.headers["authorization"].split(" ")[1];
        }
    }
    if(!token) {
        console.error("token not present");
        return res.status(403).json({error: 'token not present'})
    }
    try {
        var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
        console.log(decoded)
        console.log(Date.now())
        console.log(decoded.exp)
        if (Date.now() >= decoded.exp) {
            console.error("expired token");
             return res.status(400).json({error: 'expired token'});
        }
        var result = jwt.verify(token, "secret", (err, user) => {    
          if (err) return res.status(403)  
          else if(user) return res.status(200)  
        })

    }catch(ex) {
        console.error(ex.message)
        res.status(400).json({error: ex.message});
        return;
    }

    console.log("valid token");
    res.status(200).json({message: 'valid token'});
    return result
}

function authInitialize(req, res) {
    console.log("Authenticating Credentials");
    try{
    var payload = req.body.data;
    return res.json({ status : true , token : jwt.sign(payload, "secret", { expiresIn: 50, }) });
    }
    catch(err)
    {
    return res.json({ status : false, message: err.message });   
    }
}


var port = 7070
var server = require('http').Server(app);
server.listen(port, function (err) {
    if (!err) {
         console.log('JSON Server is running at', port)
    } else {
        console.log("Error in starting REST API Server ", err);
    }
})