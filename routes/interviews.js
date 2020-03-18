const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  moment		= require("moment"),
      Patient   	= require("../models/patient"),
	  Interview 	= require("../models/interview"),
	  { isLoggedIn,
		errorHandler }	= require("../middleware"),
	  { newInterview,
		createInterview } = require('../controllers/interviews');

// ROUTES   
// INDEX - N/A as listed on patient show page     

// NEW - Show New Interview Form
router.get("/new", isLoggedIn, errorHandler(newInterview));

// CREATE Interview - Create New Interview then redirect to Edit Interview Form
router.post("/", isLoggedIn, errorHandler(createInterview));

// SHOW - Show one interview
router.get("/:interview_id", isLoggedIn, (req, res) => {
	Patient.findById(req.params.id, (err, foundPatient) => {
		if(err){
			console.log(err);
		} else {
			Interview.findById(req.params.interview_id, (err, foundInterview) => {
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
router.put("/:interview_id", isLoggedIn, (req, res) => {
	Interview.findByIdAndUpdate(req.params.interview_id, req.body.interview, (err, updatedInterview) => {
		if(err){
			res.redirect("back");
		} else {
			res.json(updatedInterview);
		}
	});
});

// DESTROY Interview
router.delete("/:interview_id", isLoggedIn, (req, res) => {
	let patientId = req.params.id;
	Interview.findByIdAndRemove(req.params.interview_id, (err) => {
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