const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
    Urgency: {
        type: Number,
        required: true
    },
    DeadLine: {
        type: Date,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Text: {
        type: String,
        required: true
    },
    Public: {
        type: Boolean,
        required: true
    },
    AddedBy: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model("Entries", entrySchema);