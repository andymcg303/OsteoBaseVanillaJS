const mongoose = require("mongoose");
const MedHist = require("./medhist");
const Interview = require("./interview");
const Clinical = require("./clinical");
const Document = require("./document");
const { cloudinary } = require("../cloudinary");

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
    ],
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document"
      }
    ]
});

// remove assoc medhists
patientSchema.pre('remove', async function(next){
  try {
    await MedHist.deleteMany({
      "_id": {
      $in: this.medhists  
      }
    });
    next();
  } catch(err) {
    next(err);
  }
});

// remove assoc interviews
patientSchema.pre('remove', async function(next){
  try {
    await Interview.deleteMany({
      "_id": {
      $in: this.interviews  
      }
    });
    next();
  } catch(err) {
    next(err);
  }
});

// remove assoc clinicals
patientSchema.pre('remove', async function(next){
  try {
    await Clinical.deleteMany({
      "_id": {
      $in: this.clinicals  
      }
    });
    next();
  } catch(err) {
    next(err);
  }
});

// remove assoc documents
patientSchema.pre('remove', async function(next){
  try {

    // delete from cloudinary whilst id exists in DB
    for (const document of this.documents){
      let foundDocument = await Document.findById(document);
      await cloudinary.v2.uploader.destroy(foundDocument.public_id);      
    }

    await Document.deleteMany({
      "_id": {
      $in: this.documents  
      }
    });
    next();

  } catch(err) {
    next(err);
  }
});

module.exports = mongoose.model("Patient", patientSchema);