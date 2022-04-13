var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  order_Id: { type: String },
  items: [String],
  total_amount: {type: Number},
  order_type: {type: String},
  restaurant_Id: {type: String},
  customer_Id: {type: String}
}, { collection: 'orders' });

//minimum 3 letter title
OrderSchema.path('symbol').validate(function (value) {
  return value && value.length >= 3;
}, 'symbol should be minimum of 3 letters');

mongoose.model('Order', OrderSchema)

module.exports = mongoose.model('Order')