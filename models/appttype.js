const mongoose = require("mongoose");

const apptTypeSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    value: String,
    type: String,
    abbreviation: String,
    duration: Number,
    price: Number
});

module.exports = mongoose.model("ApptType", apptTypeSchema);