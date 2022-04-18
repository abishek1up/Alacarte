const Sequelize = require('sequelize');
const DataTypes = require('mysql');

/* var mongoose = require('mongoose');


var OrderSchema = new mongoose.Schema({
  order_Id: { 
    type: Number,  
    min: [10, 'Must be at least 10'],
    max: 10000 },
  // items: [String],
  total_amount: { 
    type: Number,  
    min: [10, 'Must be at least 10'],
    max: 1000 },
  order_type: {  
    type: String,
    minlength: 4,
    maxlength: 20,
    message :'String length should be within 4 to 20 Characters' },
  restaurant_Id: { 
    type: String,
    minlength: 4,
    maxlength: 20,
    message :'String length should be within 4 to 20 Characters'  
  },
  customer_Id: { 
    min: [10, 'Must be at least 10'],
    max: 10000 
  },
  /*   ,created_at: {type: String},
  updated_at: {type: String}
}, { collection: 'order' });


mongoose.model('Orders', OrderSchema)

module.exports = mongoose.model('Orders') */

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

  module.exports = mongoose.model('orders')




  


/* module.exports = Orders */