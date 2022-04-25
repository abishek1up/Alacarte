const jsonServer = require('json-server')
//const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const moment = require('moment');
require("dotenv").config()
const logger = require('./winston')
const app = jsonServer.create()

app.use(bodyParser.json());

app.get("/validate/token", validateToken, (req, res) => {
    res.json({ valid: true })
})
app.post('/oauth/token', authInitialize);

app.get("/health", (req, res) => {
    res.send("OK")
})

function validateToken(req, res) {
    logger.info("Validating token");

    var token = req.headers["x-auth-token"];
    if (!token) {
        if (req.headers["authorization"]) {
            token = req.headers["authorization"].split(" ")[1].trim();
        }
    }
    try {
        var decoded = jwt.decode(token, process.env.JWTSECRET);
        if (decoded.exp < (new Date().getTime() + 1) / 1000) {
            logger.error("Token Expired. Please Login Again!");
            return res.status(401).json({ error: 'Token Expired. Please Login Again!' });
        }
        var result = jwt.verify(token, process.env.JWTSECRET, (err, user) => {
            if (err) return res.status(401).json({ message: err.message });
            else if (user) return res.status(200).json({ message: 'Token is Valid' });
        })

    } catch (ex) {
        logger.error(ex.message)
        res.status(400).json({ error: ex.message });
        return;
    }


    logger.info("Token is Valid");
    //res.status(200).json({ message: 'Token is Valid' });
    return result
}

function authInitialize(req, res) {
    logger.info("Authenticating Credentials");
    try {
        var payload = req.body.data;
        return res.json({ status: true, token: jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '5m', }), tokenExpiresIn : '5m' });
    }
    catch (err) {
        return res.json({ status: false, message: err.message });
    }
}


var port = 7070
var server = require('http').Server(app);
server.listen(port, function (err) {
    if (!err) {
        logger.info('Authentication Service running at PORT - ' + port)
    } else {
        logger.error("Error in starting Authentication Service " + err);
    }
})