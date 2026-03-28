import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema({
    name: { type: String, required: true},
    email: {type: String},
    gender: {type: String},
    location: {type: String},
    occupation: {type: String},
});

export const Profile = mongoose.model("profile", profileSchema);
