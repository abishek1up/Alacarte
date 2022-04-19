var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  customerName: { type: String ,
    minlength: 4,
    maxlength: 200,
    message :'String length should be within 4 to 20 Characters',
    unique: true,
  },
  customerId: { 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 1000000000,
    unique: true,
  },
  location: {
    city : { 
      type: String,
      minlength: 4,
      maxlength: 20,
      message :'String length should be within 4 to 20 Characters' },
    state : {    
      type: String,
      minlength: 4,
      maxlength: 20,
      message : 'String length should be within 4 to 20 Characters' },
  },
  average_rating :  {type: Number},
  review_Id: { 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 1000000000,
    unique: true,
  },
}, { collection: 'customer' });




mongoose.model('Customers', CustomerSchema)

module.exports = mongoose.model('Customers')


