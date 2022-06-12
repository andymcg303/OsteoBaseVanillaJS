const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    path: String, 
    filename: String,
    file_name: String
});

module.exports = mongoose.model("Document", documentSchema);