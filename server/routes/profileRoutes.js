import express from "express";
import { Profile } from "../models/profile.model.js";

const profilerouter = express.Router();

// Get data
profilerouter.get("/profiles/all", async (req, res) => {
    try {
        const allProfiles = await Profile.find({});
        res.status(200).json(allProfiles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profiles", error: error.message });
    }
});

// POST a new profile
profilerouter.post("/profiles/add", async (req, res) => {
    try {
        const newProfile = new Profile(req.body);
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        res.status(400).json({ message: "Error saving profile", error: error.message });
    }
});

// 2. PUT: Update profile settings
profilerouter.put("/profiles/update/:id", async (req, res) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true, runValidators: true } // Returns the newly updated doc
        );
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
});

export default profilerouter;