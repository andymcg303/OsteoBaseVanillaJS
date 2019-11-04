const mongoose = require("mongoose");

const medhistSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    meds_bool: Boolean,
    meds: String,
    ops_bool: Boolean,
    ops: String,
    fracs_bool: Boolean,
    fracs: String,
    accs_bool: Boolean,
    accs: String,
    ill_bool: Boolean,
    ill: String,
    resp_bool: Boolean,
    resp: String,
    cvs_bool: Boolean,
    cvs: String,
    gu_bool: Boolean,
    gu: String,
    git_bool: Boolean,
    git: String,
    gynae_bool: Boolean,
    gynae: String,
    msk_bool: Boolean,
    msk: String

});

module.exports = mongoose.model("MedHist", medhistSchema);