const Joi = require('@hapi/joi');
var test = require('mongoose');
const customerschema = Joi.object({ 
    name: Joi.string().min(3).max(30).required(),
    customerId: Joi.number().integer().min(1000).max(1000000000), 
    location: Joi.array().items(Joi.object({ 
        city: Joi.string().min(4).max(20).required(),
        state: Joi.string().min(4).max(30).required(),
      }))
  }); 

const loginSchema = Joi.object({ 
    email: Joi.string().email().min(4).max(30).required(),
    password: Joi.string().min(4).max(30).required()
  });   

const registerSchema = Joi.object({ 
  customerName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().min(4).max(30).required(),
  password: Joi.string().min(4).max(30).required(),
  location: Joi.object({ 
    city: Joi.string().min(4).max(20).required(),
    state: Joi.string().min(4).max(30).required(),
  })
});  

const updateCustomerSchema = Joi.object({ 
  customerName: Joi.string().min(3).max(30).required(),
  location: Joi.object({ 
    city: Joi.string().min(4).max(20).required(),
    state: Joi.string().min(4).max(30).required(),
  })
});  

const customerId = Joi.number().integer().min(1000).max(1000000000)


  module.exports = {
    loginSchema , registerSchema, updateCustomerSchema, customerId
  }