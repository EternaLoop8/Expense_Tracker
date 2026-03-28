import mongoose from "mongoose";

const { Schema } = mongoose;

const todayspentSchema = new Schema({
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
});

export const TodaySpent = mongoose.model("todayspent", todayspentSchema);