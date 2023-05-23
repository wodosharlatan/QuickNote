const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
    ID: {
        type: Number,
        required: true,
    },
    Urgency: {
        type: Number,
        required: true
    },
    DeadLine: {
        type: Date,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Text: {
        type: String,
        required: true
    },
    IsPublic: {
        type: Boolean,
        required: true
    },
    AddedBy: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model("Entries", entrySchema);