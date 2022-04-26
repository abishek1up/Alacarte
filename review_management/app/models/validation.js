const Joi = require('@hapi/joi');

const reviewCreateSchema = Joi.object({ 
  orderId: Joi.number().min(100).max(1000000000).required(),
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().min(4).max(200).required(),
  restaurantId: Joi.number().integer().min(1000).max(1000000000).required(),
  customerId: Joi.number().integer().min(1000).max(1000000000).required(),
});  


const reviewUpdateSchema = Joi.object({ 
  review: Joi.string().min(4).max(200).required(),
  rating: Joi.number().min(1).max(5).required(),
});  


const review_Id = Joi.number().min(1000).max(1000000000)
const orderId = Joi.number().min(100).max(1000000000)

  module.exports = {
    reviewUpdateSchema, reviewCreateSchema, orderId, review_Id
  }