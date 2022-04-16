var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  review_Id: { type: Number},
  restaurant_Id: {type: Number},
  customerId: {type: Number},
  rating: {type: Number},
  detail:{type: String},  
/*   created_at: {type: String},
  updated_at: {type: String} */
}, { collection: 'review' });


mongoose.model('Reviews', ReviewSchema)

module.exports = mongoose.model('Reviews')