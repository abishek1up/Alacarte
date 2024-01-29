const Joi = require('@hapi/joi');


const checkTotalAmountSchema = Joi.object({ 
  customerId: Joi.number().integer().min(1000).max(1000000000).required(),
  restaurantId: Joi.number().integer().min(1000).max(1000000000).required(),
  OrderItems: Joi.array().items(Joi.number().required()).required()
});  
 

const orderId = Joi.number().integer().min(100).max(1000000000)

const otherID = Joi.number().integer().min(1000).max(1000000000)

  module.exports = {
    checkTotalAmountSchema, otherID, orderId
  }