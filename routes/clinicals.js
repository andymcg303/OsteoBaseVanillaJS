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
		destroyItem } = require("../controllers/clinicals");	    

// NEW - Show New Clinicals Form
router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(newItem));

// CREATE Clinical - Create New Clinical then redirect to Show Patient
router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(createItem));

// SHOW - Show one clinical
router.get("/:clinical_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(showItem));
		
// UPDATE MedHist - Update one clinical, then disable controls
router.put("/:clinical_id", isLoggedIn, asyncErrorHandler(isAuthorised), asyncErrorHandler(updateItem));

// DESTROY Clinical
router.delete("/:clinical_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(destroyItem));

module.exports = router;