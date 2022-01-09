const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
        viewType } = require("../middleware");
const { getCalendar,
		getAppointments, 
		createAppointment } = require('../controllers/calendar');

router.get("/calendar", isLoggedIn, viewType, asyncErrorHandler(getCalendar));

router.get("/calendar/appointments", isLoggedIn, viewType, asyncErrorHandler(getAppointments));

router.post("/calendar/appointment", isLoggedIn, asyncErrorHandler(createAppointment));

module.exports = router;