const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
		viewType }	= require("../middleware"),
	  { newInterview,
		createInterview,
		showInterview,
		updateInterview,
		destroyInterview } = require('../controllers/interviews');    

// NEW - Show New Interview Form
router.get("/new", isLoggedIn, asyncErrorHandler(newInterview));

// CREATE Interview - Create New Interview then redirect to Edit Interview Form
router.post("/", isLoggedIn, asyncErrorHandler(createInterview));

// SHOW - Show one interview
router.get("/:interview_id", isLoggedIn, viewType, asyncErrorHandler(showInterview));

// UPDATE Interview - Update one interview, then disable controls
router.put("/:interview_id", isLoggedIn, asyncErrorHandler(updateInterview));

// DESTROY Interview
router.delete("/:interview_id", isLoggedIn, asyncErrorHandler(destroyInterview));

module.exports = router;