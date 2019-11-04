const mongoose = require("mongoose");

const clinicalSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    OE: String,
    diag_bool: Boolean,
    diag: String,
    TTT: String
});

module.exports = mongoose.model("Clinical", clinicalSchema);