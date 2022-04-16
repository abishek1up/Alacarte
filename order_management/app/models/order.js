var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  order_Id: { type: Number },
  // items: [String],
  total_amount: {type: Number},
  order_type: {type: String},
  restaurant_Id: {type: String},
  customer_Id: {type: String}
  /*   ,created_at: {type: String},
  updated_at: {type: String} */
}, { collection: 'order' });


mongoose.model('Orders', OrderSchema)

module.exports = mongoose.model('Orders')