const express = require("express"),
      router  = express.Router({mergeParams: true}),
      Patient = require("../models/patient"),
      moment  = require("moment");

// ROUTES   
// INDEX - List all patients      
router.get("/", (req, res) => {
    Patient.find({}, (err, allPatients) => {
        if (err){
            console.log(err);
        } else {
            res.render("./patients/index", {patients: allPatients});
        }
    });
});

// NEW - Show New Patient Form
router.get("/new", (req, res) => res.render("./patients/new"));

// CREATE - Create New Patient then redirect to patients
router.post("/", (req, res) => {

    Patient.create(req.body.patient, (err, newPatient) => {
        if (err){
            console.log(err)
        } else {
            console.log("New Patient Added");
            res.redirect("/patients");
        }
    });
});

// SHOW - Show info about 1 patient
router.get("/:id", (req, res) => {
    Patient.findById(req.params.id)
        .populate("interviews")
        .populate("medhists")
        .populate("clinicals")
        .exec((err, foundPatient) => {
        if (err){
            console.log(err);
        } else {
            res.render("./patients/show", {patient: foundPatient, moment: moment});
        }
    });
});

// EDIT - Show Edit Form for selected patient
router.get("/:id/edit", (req, res) => {
    Patient.findById(req.params.id, (err, foundPatient) => {
        if (err){
            console.log(err);
        } else {
            res.render("./patients/edit", {patient: foundPatient});
        }
    });
});

// UPDATE - Update selected patient, then redirect
router.put("/:id", (req, res) => {
    Patient.findByIdAndUpdate(req.params.id, req.body.patient, (err, updatedPatient) => {
        if (err){
            console.log(err); 
        } else {
            res.redirect("/patients/" + req.params.id);
        }    
    });
});

// DESTROY - Delete Patient (use with an abundance of caution!)

module.exports = router;
