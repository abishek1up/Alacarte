var mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

var ReviewSchema = new mongoose.Schema({
  review_Id: { 
    type: Number,
    min: [1000, 'Must be at least 10'],
    max: 1000000000 
  },
  order_Id:{ 
    type: Number,
    min: [1000, 'Must be at least 10'],
    max: 1000000000 
  },
  customerId: { 
    type: Number,
    min: [1000, 'Must be at least 10'],
    max: 1000000000 
  },
  rating: { 
    type: Number,
    min: [1, 'Must be at least 1'],
    max: 5 
  },
  review:{
    type: String,
  minlength: 4,
  maxlength: 200,
  message :'String length should be within 4 to 20 Characters'   
  }
/*   created_at: {type: String},
  updated_at: {type: String} */
}, { collection: 'review' });

ReviewSchema.plugin(autoIncrement.plugin, {
  model: "review", // collection or table name in which you want to apply auto increment
  field: "review_Id", // field of model which you want to auto increment
  startAt: 1000, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});


mongoose.model('Reviews', ReviewSchema)

module.exports = mongoose.model('Reviews')