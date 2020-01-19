const mongoose = require("mongoose");

const clinicalSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    problem: String,
    OE: String,
    diag: String,
    TTT: String,
    signed_off: Boolean
});

module.exports = mongoose.model("Clinical", clinicalSchema);