var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  review_Id: { 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 1000000000 
  },
  order_Id:{ 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 1000000000 
  },
  restaurant_Id: { 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 1000000000 
  },
  customerId: { 
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 1000000000 
  },
  rating: { 
    type: Number,
    min: [1, 'Must be at least 1'],
    max: 5 
  },
  detail:{
    type: String,
  minlength: 4,
  maxlength: 200,
  message :'String length should be within 4 to 20 Characters'   
  }
/*   created_at: {type: String},
  updated_at: {type: String} */
}, { collection: 'review' });

mongoose.model('Reviews', ReviewSchema)

module.exports = mongoose.model('Reviews')