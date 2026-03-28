import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "₹",
  },
  // Adding index: true for faster range queries
  date: { type: Date, default: Date.now, index: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const Transaction = mongoose.model("transaction", transactionSchema);
