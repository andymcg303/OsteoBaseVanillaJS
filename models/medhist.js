const mongoose = require("mongoose");

const medhistSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    meds: String,
    ops: String,
    fracs: String,
    accs: String,
    ill: String,
    resp: String,
    cvs: String,
    gu: String,
    git: String,
    gynae: String,
    msk: String,
    critical: String

});

module.exports = mongoose.model("MedHist", medhistSchema);