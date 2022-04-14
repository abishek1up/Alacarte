var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  address: {
    city : { type: String },
    state : { type: String },
    coordinates : { 
      lat : { type: Number },
      lon : { type: Number },
    }
  },
  cuisine: { type: String },
  budget: { type: Number },
  total_review:  { type: Number },
  ratings: [Number],
  name: {type: String},
  restaurant_id: {type: Number},
  menu_id: { type: Number }
}, { collection: 'restaurant' });

//minimum 3 letter title
RestaurantSchema.path('name').validate(function (value) {
  return value && value.length >= 3;
}, 'symbol should be minimum of 3 letters');

mongoose.model('Restaurant', RestaurantSchema)

module.exports = mongoose.model('Restaurant')