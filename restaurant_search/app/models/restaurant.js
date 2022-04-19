var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  address: {
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
    coordinates : { 
      lat : { 
        type: Number ,
        minlength: 2,
        maxlength: 5,
        message : 'Number of digits length should be within 2 to 5 Characters' },
      lon : { 
        type: Number,
        minlength: 2,
        maxlength: 5, 
        message : 'Number of digits length should be within 2 to 5 Characters' },
    }
  },
  cuisine: { 
    type: String,
    minlength: 4,
    maxlength: 20,
    message :'String length should be within 4 to 20 Characters' 
  },
  budget: { 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 10000 
  },
  total_reviews:  { type: Number , 
    min: [1, 'Must be at least 1'],
    max: 100000  
  },
  ratings:  { 
    type: Number,
    min: [1, 'Must be at least 1'],
    max: 5  
  },
  name: {
    type: String,
    minlength: 4,
    maxlength: 20,
    message :'String length should be within 4 to 20 Characters' 
  },
  restaurant_id: {
    type: Number,
    unique: true,
    min: [1, 'Must be at least 1'],
    max: 1000000000 
  },
  menu_id: {     
    type: Number,
    unique: true,
    min: [1, 'Must be at least 1'],
    max: 1000000000 
  }
},
{ collection: 'restaurant' });

//minimum 3 letter title
RestaurantSchema.path('name').validate(function (value) {
  return value && value.length >= 3;
}, 'symbol should be minimum of 3 letters');

mongoose.model('Restaurant', RestaurantSchema)

module.exports = mongoose.model('Restaurant')