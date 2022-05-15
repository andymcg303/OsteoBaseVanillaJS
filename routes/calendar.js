const express   	= require("express"),
	  router		= express.Router({mergeParams: true}),
	  { isLoggedIn,
		asyncErrorHandler,
        viewType } = require("../middleware");
const { getCalendar,
		getAppointments, 
		createAppointment,
		deleteAppointment,
		updateAppointment,
		getApptAbbrv } = require('../controllers/calendar');

router.get("/", isLoggedIn, viewType, asyncErrorHandler(getCalendar));

router.get("/appointments", isLoggedIn, asyncErrorHandler(getAppointments));

router.post("/appointment", isLoggedIn, asyncErrorHandler(createAppointment));

router.put("/appointment/:appt_id", isLoggedIn, asyncErrorHandler(updateAppointment));

router.delete("/appointment/:appt_id",  isLoggedIn, asyncErrorHandler(deleteAppointment));

router.get("/appointment/abbrv/:appt_type", isLoggedIn, asyncErrorHandler(getApptAbbrv));

module.exports = router;