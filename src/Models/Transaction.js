const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    orderid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      default: " ",
    },
    serviceid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
      default: " ",
    },
    paymentmode: {
      type: String,
      default: " ",
    },
    gxttax: {
      type: String,
      default: " ",
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const TransactionModel = mongoose.model("Transaction", TransactionSchema);
module.exports = TransactionModel;