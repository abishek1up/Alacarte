const Sequelize = require('sequelize');
const DataTypes = require('mysql');
const autoIncrement = require("mongoose-auto-increment");
var mongoose = require('mongoose');


var OrderSchema = new mongoose.Schema({
  order_Id: {
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 10000
  },
  // items: [String],
  OrderItems: [{
    type: Number
  }],
  total_amount: {
    type: Number,
    min: [10, 'Must be at least 10'],
    max: 1000
  },
  restaurant_Id: {
    type: String,
    minlength: 4,
    maxlength: 20,
    message: 'String length should be within 4 to 20 Characters'
  },
  customerId: {
    type: Number,
    min: [1000, 'Must be at least 10'],
    max: 1000000000,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
}, { collection: 'order' });




autoIncrement.initialize(mongoose.connection);
OrderSchema.plugin(autoIncrement.plugin, {
  model: "order", // collection or table name in which you want to apply auto increment
  field: "order_Id", // field of model which you want to auto increment
  startAt: 10, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

mongoose.model('Orders', OrderSchema)

module.exports = mongoose.model('Orders')
/* 
const orders = sequelize.define(
  "orders",
  {
    order_Id: { type: DataTypes.INTEGER, allowNull: false },
    total_amount: { type: DataTypes.STRING, allowNull: false },
    restaurant_Id: { type: DataTypes.STRING, allowNull: false },
    customer_Id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = mongoose.model('orders') */









/* module.exports = Orders */