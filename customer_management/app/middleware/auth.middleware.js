const axios = require('axios')
const logger = require("../config/winston")

module.exports = {
    authValidate: async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader.split(' ')[1]
        if(!token) {  return res.status(403).json({ Message : "Token Not Present, Please login."}) }
        try {
            const result = await axios.get("http://localhost:7070/validate/token", {
                headers: {
                    authorization: `JWT ${token}`
                }
            })

            if (result.status === 200) {
                logger.info("Token Authentiation Successful"); 
                return next()
            } else {
                logger.error("Token Authentiation Failed"); 
               
            }
        } catch (error) {
            logger.error("Token Authentiation Failed"); 
            res.status(403).json(error.message)
            return;
        }
    },

    authInitialize: async (payload) => {
        try {
            const result = await axios.post("http://localhost:7070/oauth/token", {
                data: payload
            })
            .then(function (response) {
                return response
                })
            .catch(function (error) {
                return error.message;
                })
    
            if (result.status === 200 && result.data.status) {
                logger.info("Token Initialization Successful"); 
                console.log("Token Initialization Successful")
                return result.data
            } else {
                logger.error("Token Initialization Failed"); 
                console.log("Token Initialization Failed")
                console.log(result)
                return result
            }
        } catch (error) {
            logger.error("Token Initialization Exception"); 
            console.log("Token Initialization Exception")
            return;
        }
    }

}