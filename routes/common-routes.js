const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
		viewType,
		itemType,
		isAuthorised }	= require("../middleware"),
	  { newItem,
		createItem,
		showItem,
		updateItem,    
		destroyItem } = require('../controllers/common-controllers');

// NEW - Show New Clinicals Form
router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(newItem));

// CREATE Clinical - Create New Clinical then redirect to Show Patient
router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(createItem));

// SHOW - Show one clinical
router.get("/:item_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(showItem));
		
// UPDATE MedHist - Update one clinical, then disable controls
router.put("/:item_id", isLoggedIn, asyncErrorHandler(isAuthorised), itemType, asyncErrorHandler(updateItem));

// DESTROY Clinical
router.delete("/:item_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(destroyItem));

module.exports = router;