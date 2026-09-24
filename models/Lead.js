const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        company: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ["New", "Contacted", "Follow-up", "Converted", "Lost"],
            default: "New"
        },
        followUpDate: {
            type: Date
        },
        note: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;