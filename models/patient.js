const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    date_created: {type: Date, default: Date.now},
    firstname: String,
    surname: String,
    dob: Date,
    address: String,
    postcode: String,
    phonenumber: String,
    email: String,
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview"	
      }
    ],
    medhists: [
		  {
		  	type: mongoose.Schema.Types.ObjectId,
			  ref: "MedHist"	
		  }
    ],
    clinicals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinical"	
      }
    ]
});

module.exports = mongoose.model("Patient", patientSchema);