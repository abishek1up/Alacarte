const axios = require('axios')
const jwt = require('jsonwebtoken');

module.exports = {
    authValidate: async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader.split(' ')[1]
        try {
            const result = await axios.get("http://localhost:7070/validate/token", {
                headers: {
                    Authorization: `JWT ${token}`
                }
            })

            if (result.status === 200) {
                console.log("Auth successful")
                return next()
            } else {
                console.log("Auth failed")
                res.status(403).json({ 'error': 'unauthorized error' })
                return;
            }
        } catch (error) {
            console.log("Auth exception")
            res.status(403).json({ 'error': 'unauthorized error' })
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
                return result.data
            } else {
                console.log("Auth failed")
                console.log(result)
                return result
            }
        } catch (error) {
            console.log("Auth exception")
            return;
        }
    },
    authenticateToken: async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token,  "secret", (err, user) => {
            console.log(err)
      
          if (err) return res.sendStatus(403)
      
          req.user = user
      
          next()
        })
      }

}