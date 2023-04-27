// Import Mongoose
const mongoose = require("mongoose");

// Create a subscriber schema
const subscriberSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan_id: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    subscription_date: {
      type: Date,
    },
    subscription_end_date: {
      type: Date,
    },
    total_download: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
// Create a subscriber model
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
