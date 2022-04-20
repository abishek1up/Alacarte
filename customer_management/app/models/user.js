var mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 20,
    message: 'String length should be within 4 to 20 Characters'
  },
  email: {
    type: String,
    minlength: 4,
    maxlength: 20,
    message: 'String length should be within 4 to 20 Characters'
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 20,
    message: 'Password length should be within 8 to 20 Characters'
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
}, { collection: 'user' });

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {
  model: "user", // collection or table name in which you want to apply auto increment
  field: "customerId", // field of model which you want to auto increment
  startAt: 1000, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = User = mongoose.model("user", UserSchema);