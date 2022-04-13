var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  symbol: { type: String, default: '' },
  quantity: {type: Number},
  price: {type: Number},
  order_type: {type: String},
}, { collection: 'orders' });

//minimum 3 letter title
OrderSchema.path('symbol').validate(function (value) {
  return value && value.length >= 3;
}, 'symbol should be minimum of 3 letters');

mongoose.model('Order', OrderSchema)

module.exports = mongoose.model('Order')