const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      Patient       = require("../models/patient"),
      { isLoggedIn, errorHandler }    = require("../middleware"),
      { 
          getPatients, 
          newPatient, 
          createPatient, 
          showPatient, 
          updatePatient 
    } = require('../controllers/patients');

// ROUTES   
// INDEX - List all patients      
router.get("/", isLoggedIn, errorHandler(getPatients));

// NEW - Show New Patient Form
router.get("/new",  isLoggedIn, newPatient);

// CREATE - Create New Patient then redirect to patients
router.post("/",  isLoggedIn, errorHandler(createPatient));

// SHOW - Show info about 1 patient
router.get("/:id", isLoggedIn, errorHandler(showPatient));

// SUPRECEEDED BY AJAX
// // EDIT - Show Edit Form for selected patient

// UPDATE - Update selected patient, then redirect
router.put("/:id",  isLoggedIn, errorHandler(updatePatient));

// DESTROY - Delete patient. Deleting child data handled in model
router.delete("/:id",  isLoggedIn, (req, res) => {
    Patient.findById(req.params.id, (err, foundPatient) => {
        if (err){
            console.log(err);
        } else {
            foundPatient.remove((err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect("/patients");
                }
            });
        }
    });
});

module.exports = router;
