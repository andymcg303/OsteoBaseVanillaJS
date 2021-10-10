const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    practitioner: String,
    patient: String,
    type: String,
    starttime: String,
    endtime: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);
