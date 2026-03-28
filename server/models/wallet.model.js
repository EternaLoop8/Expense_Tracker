import mongoose from "mongoose";

const { Schema } = mongoose;

const walletSchema = new Schema({
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "₹",
  },
});

export const Wallet = mongoose.model("wallet", walletSchema);