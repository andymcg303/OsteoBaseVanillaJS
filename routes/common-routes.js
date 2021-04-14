const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
		viewType,
		itemType,
		historyScroll,
		isAuthorised }	= require("../middleware"),
	  { newItem,
		createItem,
		showItem,
		updateItem,    
		destroyItem } = require('../controllers/common-controllers');

// NEW - Show New Item Form
router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, historyScroll, itemType, asyncErrorHandler(newItem));

// CREATE - Create New Item
router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, historyScroll, itemType, asyncErrorHandler(createItem));

// SHOW - Show one Item
router.get("/:item_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(showItem));
		
// UPDATE - Update one item, then disable controls
router.put("/:item_id", isLoggedIn, asyncErrorHandler(isAuthorised), itemType, asyncErrorHandler(updateItem));

// DESTROY
router.delete("/:item_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, itemType, asyncErrorHandler(destroyItem));

module.exports = router;