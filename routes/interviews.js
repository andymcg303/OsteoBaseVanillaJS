const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
		viewType,
		isAuthorised }	= require("../middleware"),
	  { newInterview,
		createInterview,
		showInterview,
		updateInterview,
		destroyInterview } = require('../controllers/interviews');    

// NEW - Show New Interview Form
router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(newInterview));

// CREATE Interview - Create New Interview then redirect to Edit Interview Form
router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(createInterview));

// SHOW - Show one interview
router.get("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, viewType, asyncErrorHandler(showInterview));

// UPDATE Interview - Update one interview, then disable controls
router.put("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, asyncErrorHandler(updateInterview));

// DESTROY Interview
router.delete("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, viewType, asyncErrorHandler(destroyInterview));

module.exports = router;