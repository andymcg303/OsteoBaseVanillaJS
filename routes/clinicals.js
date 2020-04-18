const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
		viewType }	= require("../middleware"),
	  { newClinical,
		createClinical,
		showClinical,
		updateClinical,
		destroyClinical } = require("../controllers/clinicals");	    

// NEW - Show New Clinicals Form
router.get("/new", isLoggedIn, viewType, asyncErrorHandler(newClinical));

// CREATE Clinical - Create New Clinical then redirect to Show Patient
router.post("/", isLoggedIn, viewType, asyncErrorHandler(createClinical));

// SHOW - Show one clinical
router.get("/:clinical_id", isLoggedIn, viewType, asyncErrorHandler(showClinical));
		
// UPDATE MedHist - Update one clinical, then disable controls
router.put("/:clinical_id", isLoggedIn, asyncErrorHandler(updateClinical));

// DESTROY Clinical
router.delete("/:clinical_id", isLoggedIn, viewType, asyncErrorHandler(destroyClinical));

module.exports = router;