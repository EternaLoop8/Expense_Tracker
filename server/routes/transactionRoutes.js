import express from "express";
import { Transaction } from "../models/transaction.model.js";

const transactionrouter = express.Router();

// Get transactions with time filters
transactionrouter.get("/transaction/filter", async (req, res) => {
  try {
    const { range } = req.query; 
    let startDate;
    const now = new Date();

    if (range === "today") {
      startDate = new Date(now.setHours(0, 0, 0, 0));
    } else if (range === "weekly") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (range === "monthly") {
      // Logic for the current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // FIX: Changed 'createdAt' to 'date' to match your Schema
    const query = startDate ? { date: { $gte: startDate } } : {};
    
    // FIX: Sorting by 'date' instead of 'createdAt'
    const transactions = await Transaction.find(query).sort({ date: -1 });
    
    res.json({ 
      range: range || "all",
      count: transactions.length, 
      data: transactions 
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching data", error: err.message });
  }
});


// get specific transaction
transactionrouter.get("/transaction/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const spent = await Transaction.findById(id);
    res.json({ data: spent });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "something went wrong!",
      error: err.message,
    });
  }
});

// delete a transaction
transactionrouter.delete("/transaction/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Transaction.findByIdAndDelete(id);
    console.log(response);
    res.send("success!");
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong!" });
  }
});

// edit a transaction
transactionrouter.patch("/transaction/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body; // Capture the new data
    
    // Pass updateData and { new: true } to get the updated document back
    const response = await Transaction.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!response) return res.status(404).send({ message: "Transaction not found" });
    res.send({ message: "success!", data: response });
  } catch (err) {
    res.status(400).send({ message: "something went wrong!" });
  }
});

// save a transaction
transactionrouter.post("/transaction", async (req, res) => {
  try {
    const data = req.body;
    const spent = new Transaction(data);
    const response = await spent.save();
    console.log(response);
    res.send(response);
  } catch (err) {
    console.error("Mongoose Error:", err);
    res.status(400).send({
      message: "something went wrong!",
      error: err.message,
    });
  }
});

export default transactionrouter;