const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  moment  		= require("moment"),
      Patient   	= require("../models/patient"),
	  MedHist 		= require("../models/medhist"),
	  { isLoggedIn }	= require("../middleware");

// ROUTES   
// INDEX - N/A as listed on patient show page     

// NEW - Show New MedHist Form
router.get("/new", isLoggedIn, (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
		   console.log(err);
		} else {
			res.render("./medhists/new", {patient: foundPatient});	
		}
	});
});

// CREATE MedHist - Create New MedHist then redirect to Show Patient
router.post("/", isLoggedIn, (req, res) => {
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
router.get("/:medhist_id", isLoggedIn, (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);
		} else {
			MedHist.findById(req.params.medhist_id, (err, foundMedHist) => {
				if(err){
					res.redirect("back");
				} else {
					res.render("./medhists/show", {patient: foundPatient, medhist: foundMedHist, moment: moment});		
				}
			});
		}
	});
});
			
// UPDATE MedHist - Update one medhist
router.put("/:medhist_id", isLoggedIn, (req, res) => {
	MedHist.findByIdAndUpdate(req.params.medhist_id, req.body.medhist, (err, updatedMedhist) => {
		if(err){
			res.redirect("back");
		} else { 
			res.json(updatedMedhist);
		}		
	});
});

// DESTROY
router.delete("/:medhist_id", isLoggedIn, (req, res) => {
	let patientId = req.params.id;
	MedHist.findByIdAndRemove(req.params.medhist_id, (err) => {
		if(err){
			res.redirect("back");
		} else {
			Patient.findByIdAndUpdate(patientId,
				{
					$pull: {
						medhists: req.params.medhist_id
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