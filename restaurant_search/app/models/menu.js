var mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

var MenuSchema = new mongoose.Schema({
  
  menu_id: {     
    type: Number,
    unique: true,
    min: [1, 'Must be at least 1'],
    max: 1000000000 
  },
  item_id: {     
    type: Number,
    unique: true,
    min: [1, 'Must be at least 1'],
    max: 1000000000 
  },
  type: {     
    type: String,
    enum: ['VEG', 'NON-VEG'],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
},
{ collection: 'menu' });

MenuSchema.plugin(autoIncrement.plugin, {
    model: "menu", // collection or table name in which you want to apply auto increment
    field: "item_id", // field of model which you want to auto increment
    startAt: 1000, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
  });

//minimum 3 letter title
mongoose.model('menu', MenuSchema)

module.exports = mongoose.model('menu')