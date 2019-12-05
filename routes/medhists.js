const express   = require("express"),
	  router	= express.Router({mergeParams: true}),
	  moment  = require("moment"),
      Patient   = require("../models/patient"),
	  MedHist = require("../models/medhist");

// ROUTES   
// INDEX - N/A as listed on patient show page     

// NEW - Show New MedHist Form
router.get("/new", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
		   console.log(err);
		} else {
			res.render("./medhists/new", {patient: foundPatient});	
		}
	});
});

// CREATE MedHist - Create New MedHist then redirect to Show Patient
router.post("/", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);		
		} else {	
			MedHist.create(req.body.medhist, (err, newMedhist) => {
				if(err){
					console.log(err);
				} else {
					foundPatient.medhists.push(newMedhist);
					foundPatient.save();
					res.redirect("/patients/" + foundPatient._id);
				}
			});
		}
	});
});

// SHOW - Show one medhist
router.get("/:medhist_id", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);
		} else {
			MedHist.findById(req.params.medhist_id, function(err, foundMedHist){
				if(err){
					res.redirect("back");
				} else {
					res.render("./medhists/show", {patient: foundPatient, medhist: foundMedHist, moment: moment});		
				}
			});
		}
	});
});

// SUPRECEEDED BY AJAX
// // EDIT MedHist - Show edit form for one medhist
// router.get("/:medhist_id/edit", (req, res) => {
// 	Patient.findById(req.params.id, (err, foundPatient) => {
// 		if(err){
// 			console.log(err);
// 		} else {
// 			MedHist.findById(req.params.medhist_id, (err, foundMedhist) => {
// 				if(err){
// 					res.redirect("back");
// 				} else {
// 					res.render("./medhists/edit", {patient: foundPatient, medhist: foundMedhist});		
// 				}
// 			});
// 		}
// 	});
// });
			

// UPDATE MedHist - Update one medhist
router.put("/:medhist_id", (req, res, next) => {
	MedHist.findByIdAndUpdate(req.params.medhist_id, req.body.medhist, (err, updatedMedhist) => {
		if(err){
			res.redirect("back");
		} else {
			next();
			// the json is redundant as not repainting DOM
			// res.json(updatedMedhist);
		}
	});
});

// DESTROY - N/A, not allowed to delete

module.exports = router;