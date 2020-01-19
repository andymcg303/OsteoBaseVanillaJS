const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    CO: String,
    onset: String,
    reason: String,
    agg: String,
    rel: String,
    dp: String,
    ph: String,
    invest: String,
    signed_off: Boolean
});

module.exports = mongoose.model("Interview", interviewSchema);