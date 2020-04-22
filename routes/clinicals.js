const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
		viewType,
		isAuthorised }	= require("../middleware"),
	  { newClinical,
		createClinical,
		showClinical,
		updateClinical,
		destroyClinical } = require("../controllers/clinicals");	    

// NEW - Show New Clinicals Form
router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(newClinical));

// CREATE Clinical - Create New Clinical then redirect to Show Patient
router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(createClinical));

// SHOW - Show one clinical
router.get("/:clinical_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(showClinical));
		
// UPDATE MedHist - Update one clinical, then disable controls
router.put("/:clinical_id", isLoggedIn, asyncErrorHandler(isAuthorised), asyncErrorHandler(updateClinical));

// DESTROY Clinical
router.delete("/:clinical_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(destroyClinical));

module.exports = router;