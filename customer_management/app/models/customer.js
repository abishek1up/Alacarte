var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  name: { type: String },
  cust_Id: {type: Number},
  location: {
    city : { type: String},
    state : { type: String}
  },
  average_rating :  {type: Number},
}, { collection: 'customer' });

//minimum 3 letter title
CustomerSchema.path('symbol').validate(function (value) {
  return value && value.length >= 3;
}, 'symbol should be minimum of 3 letters');

mongoose.model('customer', CustomerSchema)

module.exports = mongoose.model('customer')