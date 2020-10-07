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
	destroyItem } = require("../controllers/medhists");   

// NEW - Show New MedHist Form  
router.get("/new", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(newItem));

// CREATE MedHist - Create New MedHist
router.post("/", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(createItem));

// SHOW - Show one medhist
router.get("/:medhist_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(showItem));
			
// UPDATE MedHist - Update one medhist
router.put("/:medhist_id", isLoggedIn, asyncErrorHandler(isAuthorised), asyncErrorHandler(updateItem));

// DESTROY
router.delete("/:medhist_id", isLoggedIn, asyncErrorHandler(isAuthorised), viewType, asyncErrorHandler(destroyItem));

module.exports = router;