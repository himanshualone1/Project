const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
      default: null, // ✅ Not required initially
    },

    pickup: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    fare: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["requested", "accepted", "in_progress", "completed", "cancelled"],
      default: "requested",
    },

    distance: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    paymentId: {
      type: String,
      default: null,
    },

    orderId: {
      type: String,
      default: null,
    },
    vehicleType: {
      type: String,
      enum: ["auto", "car", "moto"],
      required: true,
    },

    signature: {
      type: String,
      default: null,
    },
    otp:{
        type: String,
        select: false, // ✅ Hide OTP from queries by default
        required: true,
    }
  },
  {
    timestamps: true, // ✅ Adds createdAt & updatedAt
  },
);

module.exports = mongoose.model("Ride", rideSchema);
