import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  spent: { type: String, required: true }, 
  total: { type: String, required: true }, 
  color: { type: String, default: 'bg-blue-500' }
}, { timestamps: true });

// Added the missing ' after Portfolio
export const Portfolio = mongoose.model('Portfolio', PortfolioSchema); 
