const express   = require("express"),
      router	= express.Router({mergeParams: true}),
      Patient   = require("../models/patient"),
	  Clinical = require("../models/clinical");

// ROUTES   
// INDEX - N/A as listed on patient show page     

// NEW - Show New Clinicals Form
router.get("/new", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
		   console.log(err);
		} else {
			res.render("./clinicals/new", {patient: foundPatient});	
		}
	});
});

// CREATE Clinical - Create New Clinical then redirect to Show Patient
router.post("/", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);		
		} else {	
			Clinical.create(req.body.clinical, (err, newClinical) => {
				if(err){
					console.log(err);
				} else {
					foundPatient.clinicals.push(newClinical);
					foundPatient.save();
					res.redirect("/patients/" + foundPatient._id);
				}
			});
		}
	});
});

// SHOW - Show one clinical
router.get("/:clinical_id", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);
		} else {
			Clinical.findById(req.params.clinical_id, (err, foundClinical) => {
				if(err){
					res.redirect("back");
				} else {
					res.render("./clinicals/show", {patient: foundPatient, clinical: foundClinical});		
				}
			});
		}
	});
});

// EDIT Clinical - Show edit form for one clinical
router.get("/:clinical_id/edit", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);
		} else {
			Clinical.findById(req.params.clinical_id, (err, foundClinical) => {
				if(err){
					res.redirect("back");
				} else {
					res.render("./clinicals/edit", {patient: foundPatient, clinical: foundClinical});		
				}
			});
		}
	});
});
			
// UPDATE MedHist - Update one comment, the redirect
router.put("/:clinical_id", (req, res) => {
	Clinical.findByIdAndUpdate(req.params.clinical_id, req.body.clinical, (err, updatedClinical) => {
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/patients/" + req.params.id + "/clinicals/" + req.params.clinical_id);
		}
	});
});

// DESTROY - N/A, not allowed to delete

module.exports = router;