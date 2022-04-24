var mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
var test = require('mongoose');
var MenuSchema = new mongoose.Schema({
  
  menu_id: {     
    type: Number,
    unique: true,
    min: [1, 'Must be at least 1'],
    max: 1000000000 
  },
  items: [
    {
      item_Id : { type : Number },
      item_Name:  { type : String },
      item_Cost: { type: Number }
    }
  ],
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


//minimum 3 letter title
mongoose.model('menu', MenuSchema)

module.exports = mongoose.model('menu')