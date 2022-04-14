var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  review_Id: { type: String, default: '' },
  restaurant_Id: {type: Number},
  customerId: {type: Number},
  rating: {type: Number},
  detail:{type: String},  
  created_at: {type: String},
  updated_at: {type: String}
}, { collection: 'reviews' });

//minimum 3 letter title
ReviewSchema.path('symbol').validate(function (value) {
  return value && value.length >= 3;
}, 'symbol should be minimum of 3 letters');

mongoose.model('Review', ReviewSchema)

module.exports = mongoose.model('Review')