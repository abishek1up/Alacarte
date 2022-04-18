var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  review_Id: { 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 10000 
  },
  restaurant_Id: { 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 10000 
  },
  customerId: { 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 10000 
  },
  rating: { 
    type: Number,
    min: [1, 'Must be at least 1'],
    max: 5 
  },
  detail:{
    type: String,
  minlength: 4,
  maxlength: 20,
  message :'String length should be within 4 to 20 Characters'   
  }
/*   created_at: {type: String},
  updated_at: {type: String} */
}, { collection: 'review' });

mongoose.model('Reviews', ReviewSchema)

module.exports = mongoose.model('Reviews')