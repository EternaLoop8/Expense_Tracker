import express from "express";
// Use curly braces because you used 'export const' in the model file
import { Portfolio } from "../models/portfolio.model.js"; 

const portfoliorouter = express.Router();

portfoliorouter.get('/portfolio', async (req, res) => {
    try {
        // Change PortfolioModel to Portfolio to match the import above
        const portfolios = await Portfolio.find(); 
        res.json(portfolios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

portfoliorouter.put('/portfolio/:id', async (req, res) => {
  try {
    const updatedItem = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

portfoliorouter.post('/portfolio', async (req, res) => {
  try {
    const { name, spent, total, color } = req.body;

    // basic validation
    if (!name || !spent || !total) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPortfolio = new Portfolio({
      name,
      spent,
      total,
      color
    });

    const saved = await newPortfolio.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default portfoliorouter;
