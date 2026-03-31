import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'profile', required: true },
    language: { type: String, default: "English (US)" },
    timezone: { type: String, default: "(GMT-05:00) Eastern Time" },
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
    notifications: {
        emailAlerts: { type: Boolean, default: true },
        desktopPush: { type: Boolean, default: false }
    },
    accountStatus: { type: String, enum: ['active', 'private', 'deactivated'], default: 'active' }
}, { timestamps: true });

export const Settings = mongoose.model("Settings", settingsSchema);