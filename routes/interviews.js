const express   	= require("express");
const router		= express.Router({mergeParams: true});
const  { isLoggedIn,
		asyncErrorHandler,
		viewType,
		isAuthorised }	= require("../middleware");
const  { newItem,
		createItem,
		showItem,
		updateItem,
		destroyItem } = require('../controllers/interviews');    

// NEW - Show New Interview Form
router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(newItem));

// CREATE Interview - Create New Interview then redirect to Edit Interview Form
router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(createItem));

// SHOW - Show one interview
router.get("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, viewType, asyncErrorHandler(showItem));

// UPDATE Interview - Update one interview, then disable controls
router.put("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, asyncErrorHandler(updateItem));

// DESTROY Interview
router.delete("/:interview_id", asyncErrorHandler(isAuthorised), isLoggedIn, viewType, asyncErrorHandler(destroyItem));

module.exports = router;