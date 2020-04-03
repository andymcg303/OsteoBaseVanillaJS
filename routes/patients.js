const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      { isLoggedIn, 
        errorHandler }    = require("../middleware"),
      { getPatients,  
        createPatient, 
        showPatient, 
        updatePatient,
        deletePatient } = require('../controllers/patients');

// ROUTES   
// INDEX - List all patients      
router.get("/", isLoggedIn, errorHandler(getPatients));

// CREATE - Create New Patient then redirect to patients
router.post("/", isLoggedIn, errorHandler(createPatient));

// SHOW - Show info about 1 patient
router.get("/:id", isLoggedIn, errorHandler(showPatient));

// UPDATE - Update selected patient, then redirect
router.put("/:id",  isLoggedIn, errorHandler(updatePatient));

// DESTROY - Delete patient. Deleting child data handled in model
router.delete("/:id",  isLoggedIn, errorHandler(deletePatient));

module.exports = router;
