const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		errorHandler }	= require("../middleware"),
	  { newInterview,
		createInterview,
		showInterview,
		updateInterview,
		destroyInterview } = require('../controllers/interviews');    

// NEW - Show New Interview Form
router.get("/new", isLoggedIn, errorHandler(newInterview));

// CREATE Interview - Create New Interview then redirect to Edit Interview Form
router.post("/", isLoggedIn, errorHandler(createInterview));

// SHOW - Show one interview
router.get("/:interview_id", isLoggedIn, errorHandler(showInterview));

// UPDATE Interview - Update one interview, then disable controls
router.put("/:interview_id", isLoggedIn, errorHandler(updateInterview));

// DESTROY Interview
router.delete("/:interview_id", isLoggedIn, errorHandler(destroyInterview));

module.exports = router;