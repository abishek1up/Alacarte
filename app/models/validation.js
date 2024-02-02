const Joi = require("@hapi/joi");

const restaurantCreateSchema = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  cuisine: Joi.string().min(4).max(20).required(),
  budget: Joi.number().integer().min(10).max(10000).required(),
  total_reviews: Joi.number().integer().min(0).max(100000).required(),
  ratings: Joi.number().min(0).max(5).required(),
  address: Joi.object({
    city: Joi.string().min(4).max(20).required(),
    state: Joi.string().min(4).max(30).required(),
    coordinates: Joi.object({
      lat: Joi.number().min(10).max(100).required(),
      lon: Joi.number().min(10).max(100).required()
    }).required()
  })
});

const menuId = Joi.number().integer().min(1).max(1000000000);
const restaurantId = Joi.number().integer().min(1000).max(1000000000);
const keyword = Joi.string().min(2).max(20).required();
const budget = Joi.number().integer().min(10).max(10000).required();

const menuCreateSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        item_Id: Joi.number().integer().min(0).max(1000).required(),
        item_Name: Joi.string().min(2).max(20).required(),
        item_Cost: Joi.number().integer().min(0).max(1000).required()
      })
    )
    .required(),
  type: Joi.any().allow("VEG", "NON-VEG").required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().min(4).max(30).required(),
  password: Joi.string().min(4).max(30).required()
});

const registerSchema = Joi.object({
  customerName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().min(4).max(30).required(),
  password: Joi.string().min(4).max(30).required(),
  location: Joi.object({
    city: Joi.string().min(4).max(20).required(),
    state: Joi.string().min(4).max(30).required()
  })
});

const updateCustomerSchema = Joi.object({
  customerName: Joi.string().min(2).max(30).required(),
  location: Joi.object({
    city: Joi.string().min(4).max(20).required(),
    state: Joi.string().min(4).max(30).required()
  })
});

const customerId = Joi.number().integer().min(1000).max(1000000000);

const checkTotalAmountSchema = Joi.object({
  customerId: Joi.number().integer().min(1000).max(1000000000).required(),
  restaurantId: Joi.number().integer().min(1000).max(1000000000).required(),
  OrderItems: Joi.array().items(
    Joi.object({
      item_Id: Joi.number().min(100).max(1000000000).required(),
      item_Name: Joi.string().min(4).max(30).required(),
      item_Cost: Joi.number().min(10).max(2000).required()
    })
  )
});

const orderId2 = Joi.number().integer().min(100).max(1000000000);

const otherID = Joi.number().integer().min(1000).max(1000000000);

module.exports = {
  loginSchema,
  registerSchema,
  updateCustomerSchema,
  customerId,
  checkTotalAmountSchema,
  otherID,
  orderId2,
  keyword,
  budget,
  restaurantCreateSchema,
  restaurantId,
  menuCreateSchema,
  menuId
};
