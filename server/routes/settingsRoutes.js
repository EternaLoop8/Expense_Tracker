import express from "express";
import { Settings } from "../models/settings.model.js";

const settingsRouter = express.Router();

// Fetch settings for a user
settingsRouter.get("/:userId", async (req, res) => {
    try {
        let settings = await Settings.findOne({ userId: req.params.userId });
        if (!settings) {
            // Create default settings if they don't exist yet
            settings = await Settings.create({ userId: req.params.userId });
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching settings", error: error.message });
    }
});

// Update settings
settingsRouter.put("/update/:userId", async (req, res) => {
    try {
        const updated = await Settings.findOneAndUpdate(
            { userId: req.params.userId },
            { $set: req.body },
            { new: true, upsert: true } // Create if doesn't exist
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
});

export default settingsRouter;
