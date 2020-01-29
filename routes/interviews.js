const express   = require("express"),
	  router	= express.Router({mergeParams: true}),
	  moment	= require("moment"),
      Patient   = require("../models/patient"),
      Interview = require("../models/interview");

// ROUTES   
// INDEX - N/A as listed on patient show page     

// NEW - Show New Interview Form
router.get("/new", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
		   console.log(err);
		} else {
			res.render("./interviews/new", {patient: foundPatient});	
		}
	});
});

// CREATE Interview - Create New Interview then redirect to Show Patient
router.post("/", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);		
		} else {	
			Interview.create(req.body.interview, (err, newInterview) => {
				if(err){
					console.log(err);
				} else {
					foundPatient.interviews.push(newInterview);
					foundPatient.save();
					res.render("./interviews/show", {patient: foundPatient, interview: newInterview, moment: moment});
					// res.redirect("/patients/" + foundPatient._id);
				}
			});
		}
	});
});

// SHOW - Show one interview
router.get("/:interview_id", (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);
		} else {
			Interview.findById(req.params.interview_id, function(err, foundInterview){
				if(err){
					res.redirect("back");
				} else {
					res.render("./interviews/show", {patient: foundPatient, interview: foundInterview, moment: moment});		
				}
			});
		}
	});
});

// UPDATE Interview - Update one interview, then disable controls
router.put("/:interview_id", (req, res) => {
	Interview.findByIdAndUpdate(req.params.interview_id, req.body.interview, (err, updatedInterview) => {
		if(err){
			res.redirect("back");
		} else {
			res.json(updatedInterview);
		}
	});
});

// DESTROY Interview
router.delete("/:interview_id", (req, res) => {
	let patientId = req.params.id;
	Interview.findByIdAndRemove(req.params.interview_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			Patient.findByIdAndUpdate(patientId,
				{
					$pull: {
						interviews: req.params.interview_id
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