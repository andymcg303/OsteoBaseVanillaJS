const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		errorHandler }	= require("../middleware"),
	  { newClinical,
		createClinical,
		showClinical,
		updateClinical,
		destroyClinical } = require("../controllers/clinicals");	    

// NEW - Show New Clinicals Form
router.get("/new", isLoggedIn, errorHandler(newClinical));

// CREATE Clinical - Create New Clinical then redirect to Show Patient
router.post("/", isLoggedIn, errorHandler(createClinical));

// SHOW - Show one clinical
router.get("/:clinical_id", isLoggedIn, errorHandler(showClinical));
		
// UPDATE MedHist - Update one clinical, then disable controls
router.put("/:clinical_id", isLoggedIn, errorHandler(updateClinical));

// DESTROY Clinical
router.delete("/:clinical_id", isLoggedIn, errorHandler(destroyClinical));

module.exports = router;