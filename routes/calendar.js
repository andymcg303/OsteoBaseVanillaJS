const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
        viewType } = require("../middleware");
const { getCalendar,
		getCalendarList } = require('../controllers/calendar');

// Calendar
router.get("/calendar", isLoggedIn, viewType, asyncErrorHandler(getCalendar));

// Calendar List
router.get("/calendar/calendarlist", isLoggedIn, asyncErrorHandler(getCalendarList));

module.exports = router;