const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    CO: String,
    onset_num_intervals: Number,
    onset_interval: Number,
    onset_reason: String,
    agg: String,
    rel: String,
    dp: String,
    ph: String,
    invest: String
});

module.exports = mongoose.model("Interview", interviewSchema);