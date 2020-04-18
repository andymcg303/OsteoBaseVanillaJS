const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
		viewType }	= require("../middleware"),
	{ newMedhist,
	createMedhist,
	showMedhist,
	updateMedhist,
	destroyMedhist } = require("../controllers/medhists");   

// NEW - Show New MedHist Form  
 router.get("/new", isLoggedIn, viewType, asyncErrorHandler(newMedhist));

// CREATE MedHist - Create New MedHist
router.post("/", isLoggedIn, viewType, asyncErrorHandler(createMedhist));

// SHOW - Show one medhist
router.get("/:medhist_id", isLoggedIn, viewType, asyncErrorHandler(showMedhist));
			
// UPDATE MedHist - Update one medhist
router.put("/:medhist_id", isLoggedIn, asyncErrorHandler(updateMedhist));

// DESTROY
router.delete("/:medhist_id", isLoggedIn, viewType, asyncErrorHandler(destroyMedhist));

module.exports = router;