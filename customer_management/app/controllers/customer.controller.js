const customerService = require("../services/customer.service")


module.exports = {
    loginUser: async (req, res) => {
        var users = await customerService.loginUser(req.body);
        return res.json(users);
    },
    registerUser : async (req, res) => {
        var users = await customerService.registerUser(req.body);
        console.log(users)
        return res.json(users);
    },
    getCustomerDetail : async (req, res) => {
        const customers = await customerService.getCustomerDetail(req.params.cust_Id)
        if(customers.statusCode == 200 && (res.statusCode >= 200 && res.statusCode < 400)){
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(customers)
        }
        else
        {
            res.statusCode = 400
            res.setHeader('Content-Type','application/json')
            res.json(customers)
        }  
    },
    deactivateUser : async (req, res) => {
        const check = await customerService.deactivateUser(req.params.cust_Id)
        if(check.acknowledged){
            res.statusCode = 200
            res.setHeader('Content-Type','application/json')
            res.json(check)
        }
        else
        {
        res.statusCode = 400
        res.setHeader('Content-Type','application/json')
        res.json(check)
        }
    },
}