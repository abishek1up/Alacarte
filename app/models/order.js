var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      min: [100, "Must be at least 100"],
      max: 1000000000,
      unique: true
    },
    // items: [String],
    OrderItems: [
      {
        item_Id: { type: Number },
        item_Name: { type: String },
        item_Cost: { type: Number }
      }
    ],
    restaurantId: {
      type: Number,
      min: [1000, "Must be at least 1000"],
      max: 1000000000
    },
    customerId: {
      type: Number,
      min: [1000, "Must be at least 1000"],
      max: 1000000000
    }
  },
  { collection: "orders", timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);
