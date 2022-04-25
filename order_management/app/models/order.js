const Sequelize = require('sequelize');
const DataTypes = require('mysql');
const autoIncrement = require("mongoose-auto-increment");
var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    min: [100, 'Must be at least 100'],
    max: 1000000000,
    unique: true
  },
  // items: [String],
  OrderItems: [
    {
      item_Id : { type : Number },
      item_Name:  { type : String },
      item_Cost: { type: Number },
    }
  ],
  total_amount: {
    type: Number,
    min: [0, 'Must be at least 0'],
    max: 100000
  },
  restaurantId: {
    type: Number,
    min: [1000, 'Must be at least 1000'],
    max: 1000000000,
  },
  customerId: {
    type: Number,
    min: [1000, 'Must be at least 1000'],
    max: 1000000000,
  }
}, { collection: 'order' , timestamps: true });




autoIncrement.initialize(mongoose.connection);
OrderSchema.plugin(autoIncrement.plugin, {
  model: "order", // collection or table name in which you want to apply auto increment
  field: "orderId", // field of model which you want to auto increment
  startAt: 100, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

mongoose.model('Orders', OrderSchema)

module.exports = mongoose.model('Orders')
