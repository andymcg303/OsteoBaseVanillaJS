const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
        viewType } = require("../middleware");
const { getCalendar } = require('../controllers/calendar');

// Calendar
router.get("/calendar", isLoggedIn, viewType, asyncErrorHandler(getCalendar));

module.exports = router;