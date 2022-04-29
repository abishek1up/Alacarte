var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    message: 'String length should be within 4 to 20 Characters',
  },
  customerId: {
    type: Number,
    min: [1000, 'Must be at least 1000'],
    max: 1000000000,
    unique: true,
  },
  location: {
    city: {
      type: String,
      minlength: 4,
      maxlength: 20,
      message: 'City length should be within 4 to 20 Characters'
    },
    state: {
      type: String,
      minlength: 4,
      maxlength: 20,
      message: 'State length should be within 4 to 20 Characters'
    },
  }
}, { collection: 'customer' , timestamps: true });


mongoose.model('Customers', CustomerSchema)

module.exports = mongoose.model('Customers')


