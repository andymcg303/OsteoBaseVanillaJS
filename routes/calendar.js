const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
        viewType } = require("../middleware");
const { getCalendar,
		getAppointments, 
		createAppointment,
		deleteAppointment } = require('../controllers/calendar');

router.get("/", isLoggedIn, viewType, asyncErrorHandler(getCalendar));

router.get("/appointments", isLoggedIn, viewType, asyncErrorHandler(getAppointments));

router.post("/appointment", isLoggedIn, asyncErrorHandler(createAppointment));

router.delete("/appointment/:appt_id",  isLoggedIn, viewType, asyncErrorHandler(deleteAppointment));

module.exports = router;