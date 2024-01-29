var mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
const isEmail = require('validator/lib/isEmail')

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
        maxlength: 20,
        message : 'Number of digits length should be within 2 to 5 Characters' },
      lon : { 
        type: Number,
        minlength: 2,
        maxlength: 20, 
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
    min: [0, 'Must be at least 1'],
    max: 100000  
  },
  ratings:  { 
    type: Number,
    min: [0, 'Must be at least 1'],
    max: 5  
  },
  name: {
    type: String,
    minlength: 4,
    maxlength: 30,
    message :'String length should be within 4 to 20 Characters' ,
    index: true
  },
  restaurantId: {
    type: Number,
    unique: true,
    min: [1000, 'Must be at least 1'],
    max: 1000000000 
  },
  menuId: {     
    type: Number,
    unique: true,
    min: [1000, 'Must be at least 1'],
    max: 1000000000 
  }
},
{ collection: 'restaurant', timestamps: true });

RestaurantSchema.index({name: 'text'});
//minimum 3 letter title
autoIncrement.initialize(mongoose.connection);
RestaurantSchema.plugin(autoIncrement.plugin, {
  model: "restaurant", // collection or table name in which you want to apply auto increment
  field: "restaurantId", // field of model which you want to auto increment
  startAt: 1000, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

RestaurantSchema.plugin(autoIncrement.plugin, {
  model: "menu", // collection or table name in which you want to apply auto increment
  field: "menuId", // field of model which you want to auto increment
  startAt: 1000, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

mongoose.model('Restaurant', RestaurantSchema)

module.exports = mongoose.model('Restaurant')