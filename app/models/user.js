var mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      minlength: 8,
      maxlength: 30,
      validate: [isEmail, "Invalid Email"],
      message: "Email length should be within 8 to 30 Characters"
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 20,
      message: "Password length should be within 8 to 20 Characters"
    },
    customerId: {
      type: Number,
      min: [1000, "Must be at least 1000"],
      max: 1000000000,
      unique: true
    }
  },
  { collection: "users", timestamps: true }
);

module.exports = Users = mongoose.model("users", userSchema);
