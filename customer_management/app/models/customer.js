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


mongoose.model('Customers', CustomerSchema)

module.exports = mongoose.model('Customers')