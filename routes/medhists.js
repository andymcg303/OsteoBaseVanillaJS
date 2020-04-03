const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
      Patient   	= require("../models/patient"),
	  MedHist 		= require("../models/medhist"),
	  { isLoggedIn,
		errorHandler }	= require("../middleware"),
	{ newMedhist,
	createMedhist,
	showMedhist,
	updateMedhist,
	destroyMedhist } = require("../controllers/medhists");   

// NEW - Show New MedHist Form  
 router.get("/new", isLoggedIn, errorHandler(newMedhist));

// CREATE MedHist - Create New MedHist then redirect to Show Patient
router.post("/", isLoggedIn, errorHandler(createMedhist));

// SHOW - Show one medhist
router.get("/:medhist_id", isLoggedIn, errorHandler(showMedhist));
			
// UPDATE MedHist - Update one medhist
router.put("/:medhist_id", isLoggedIn, errorHandler(updateMedhist));

// DESTROY
router.delete("/:medhist_id", isLoggedIn, errorHandler(destroyMedhist));

module.exports = router;