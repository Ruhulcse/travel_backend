// Import Mongoose
const mongoose = require("mongoose");

// Create a plan schema
const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    api_id: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a plan model
const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
