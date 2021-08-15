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

// NEW - Show New Form
router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(newItem));

// CREATE- Create New then redirect to Show Patient
router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(createItem));

// SHOW - Show one
router.get("/:item_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(showItem));
		
// UPDATE- Update one, then disable controls
router.put("/:item_id", isLoggedIn, asyncErrorHandler(isAuthorised), itemType, asyncErrorHandler(updateItem));

// DESTROY
router.delete("/:item_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(destroyItem));

module.exports = router;