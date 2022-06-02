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

router.get("/appointments", getAppointments);

router.post("/appointment", createAppointment);

router.put("/appointment/:appt_id", updateAppointment);

router.delete("/appointment/:appt_id", deleteAppointment);

router.get("/appointment/abbrv/:appt_type", getApptAbbrv);

module.exports = router;