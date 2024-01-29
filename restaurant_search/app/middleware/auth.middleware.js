const axios = require('axios')
const logger = require("../config/winston")

module.exports = {
    authValidate: async (req, res, next) => {
        const authHeader = req.headers['authorization']
        try {
            if (!authHeader) { return res.status(401).json({ Message: "Authorization Header not present, Please login." }) }
            const token = authHeader.split(' ')[1]
            if (!token) { return res.status(401).json({ Message: "Token Not Present, Please login." }) }

            const result = await axios.get("http://localhost:7070/validate/token", {
                headers: {
                    authorization: `JWT ${token}`
                }
            }).then(function (response) {
                return next()
            }).catch(function (error) {
                    let err = new Error(error.response.data.error); err.status = error.response.status; throw err;
                })

        } catch (error) {
            logger.error(error.message);
            return res.status(error.status).json({Message : error.message})           
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
                return result.data
            } else {
                logger.error("Token Initialization Failed");
                return result
            }
        } catch (error) {
            logger.error("Token Initialization Exception");
            return;
        }
    }

}