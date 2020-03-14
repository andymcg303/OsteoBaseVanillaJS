const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  moment		= require("moment"),
      Patient   	= require("../models/patient"),
	  Clinical 		= require("../models/clinical"),
	  { isLoggedIn }	= require("../middleware");

// ROUTES   
// INDEX - N/A as listed on patient show page     

// NEW - Show New Clinicals Form
router.get("/new", isLoggedIn, (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
		   console.log(err);
		} else {
			res.render("./clinicals/new", {patient: foundPatient});	
		}
	});
});

// CREATE Clinical - Create New Clinical then redirect to Show Patient
router.post("/", isLoggedIn, (req, res) => {
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
					res.redirect("/patients/" + foundPatient._id + "/clinicals/" + newClinical._id);
				}
			});
		}
	});
});

// SHOW - Show one clinical
router.get("/:clinical_id", isLoggedIn, (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);
		} else {
			Clinical.findById(req.params.clinical_id, (err, foundClinical) => {
				if(err){
					res.redirect("back");
				} else {
					res.render("./clinicals/show", {patient: foundPatient, clinical: foundClinical, moment: moment});		
				}
			});
		}
	});
});
		
// UPDATE MedHist - Update one clinical, then disable controls
router.put("/:clinical_id", isLoggedIn, (req, res) => {
	Clinical.findByIdAndUpdate(req.params.clinical_id, req.body.clinical, (err, updatedClinical) => {
		if(err){
			res.redirect("back");
		} else {
			res.json(updatedClinical);
		}
	});
});

// DESTROY Clinical
router.delete("/:clinical_id", isLoggedIn, (req, res) => {
	let patientId = req.params.id;
	Clinical.findByIdAndRemove(req.params.clinical_id, (err) => {
		if(err){
			res.redirect("back");
		} else {
			Patient.findByIdAndUpdate(patientId,
				{
					$pull: {
						clinicals: req.params.clinical_id
					}
				}, function(err){
					if (err){
						console.log(err);
					} else {
						res.redirect("/patients/" + patientId);
					}

				}

			)
		}
	});
});

module.exports = router;