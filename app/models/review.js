var mongoose = require("mongoose");

var ReviewSchema = new mongoose.Schema(
  {
    review_Id: {
      type: Number,
      min: [1000, "Must be at least 1000"],
      max: 1000000000
    },
    orderId: {
      type: Number,
      min: [100, "Must be at least 100"],
      max: 1000000000
    },
    rating: {
      type: Number,
      min: [1, "Must be at least 1"],
      max: 5
    },
    review: {
      type: String,
      minlength: 4,
      maxlength: 200,
      message: "String length should be within 4 to 20 Characters"
    },
    restaurantId: {
      type: Number,
      min: [999, "Must be at least 1"],
      max: 1000000000
    },
    customerId: {
      type: Number,
      min: [1000, "Must be at least 10"],
      max: 1000000000
    }
  },
  { collection: "reviews", timestamps: true }
);

module.exports = mongoose.model("reviews", ReviewSchema);
