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
        deletePatient } = require('../controllers/patients');

// ROUTES   
// INDEX - List all patients      
router.get("/", isLoggedIn, viewType, asyncErrorHandler(getPatients));

// CREATE - Create New Patient then redirect to patients
router.post("/", isLoggedIn, asyncErrorHandler(createPatient));

// SHOW - Show info about 1 patient
router.get("/:id", isLoggedIn, getUserType, viewType, asyncErrorHandler(showPatient));

// UPDATE - Update selected patient, then redirect
router.put("/:id",  isLoggedIn, asyncErrorHandler(updatePatient));

// DESTROY - Delete patient. Deleting child data handled in model
router.delete("/:id",  isLoggedIn, asyncErrorHandler(deletePatient));

module.exports = router;
