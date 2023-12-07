const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },
    password: {
      type: String,
    },
    mobilenumber: {
      type: Number,
    },
    status: {
      type: String,
      default: " ",
    },
    serviceat: {
      type: String,
    },
    role: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: " ",
    },

    profileImage: {
      type: String,
      default: " ",
    },

    paymentMode: {
      type: String,
      default: "COD",
    },

    otp: {
      type: String,
      default: " ",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    alternateNumber: {
      type: Number,
      default: " ",
    },
    address: {
      locality: { type: String, default: " " },
      city: { type: String, default: " " },
      district: { type: String, default: " " },
      state: { type: String, default: " " },
      pincode: { type: Number, default: " " },
    },

    PickUp_location: {
      locality: { type: String, trim: true, default: " " },
      city: { type: String, trim: true, default: " " },
      district: { type: String, trim: true, default: " " },
      state: { type: String, trim: true, default: " " },
      pincode: { type: Number, default: " " },
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;