const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      { isLoggedIn, 
        asyncErrorHandler,
        viewType,
        getUserType }    = require("../middleware"),
      { getPatients,  
        createPatient, 
        showPatient, 
        updatePatient,
        deletePatient,
        getPatientInfo } = require('../controllers/patients');

// ROUTES   
// INDEX - List all patients      
router.get("/", isLoggedIn, viewType, asyncErrorHandler(getPatients));

// CREATE - Create New Patient then redirect to patients
router.post("/", isLoggedIn, asyncErrorHandler(createPatient));

// SHOW - Show info about 1 patient
router.get("/:id", isLoggedIn, asyncErrorHandler(getUserType), viewType, asyncErrorHandler(showPatient));

// UPDATE - Update selected patient, then redirect
router.put("/:id",  isLoggedIn, asyncErrorHandler(updatePatient));

// DESTROY - Delete patient. Deleting child data handled in model
router.delete("/:id",  isLoggedIn, viewType, asyncErrorHandler(deletePatient));

// GET PATIENT INFO ONLY ie do not populate assoc info, used in calendar setSchedules
router.get("/info/:id", isLoggedIn, viewType, asyncErrorHandler(getPatientInfo));


module.exports = router;
