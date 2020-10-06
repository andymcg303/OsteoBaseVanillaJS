const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
		viewType,
		isAuthorised }	= require("../middleware"),
	  { newItem,
		createItem,
		showItem,
		updateItem,
		destroyItem } = require('../controllers/interviews');    

// NEW - Show New Interview Form
// router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(newInterview));
router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(newItem));

// CREATE Interview - Create New Interview then redirect to Edit Interview Form
// router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(createInterview));
router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(createItem));

// SHOW - Show one interview
// router.get("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, viewType, asyncErrorHandler(showInterview));
router.get("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, viewType, asyncErrorHandler(showItem));

// UPDATE Interview - Update one interview, then disable controls
// router.put("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, asyncErrorHandler(updateInterview));
router.put("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, asyncErrorHandler(updateItem));

// DESTROY Interview
// router.delete("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, viewType, asyncErrorHandler(destroyInterview));
router.delete("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, viewType, asyncErrorHandler(destroyItem));

module.exports = router;