const express       = require("express"),
      router        = express.Router({mergeParams: true}),
      moment        = require("moment"),
      Patient       = require("../models/patient"),
      { isLoggedIn }    = require("../middleware");
 
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// ROUTES   
// INDEX - List all patients      
router.get("/", isLoggedIn, (req, res) => {
    if(req.query.keyword) {
        const regex = new RegExp(escapeRegex(req.query.keyword), 'gi');
        Patient.find({surname: regex}, (err, foundPatients) => {
            if (err){
                console.log(err);
            } else {
                res.json(foundPatients);
            }
        });
    } else {
        // if there wasn't any query string keyword then..
        Patient.find({}, (err, allPatients) => {
            if (err){
                console.log(err);
            } else {
                if(req.xhr) {
                    res.json(allPatients);
                } else {
                    res.render("./patients/index", {patients: allPatients, moment: moment});
                }
            }
        });
    }
});

// NEW - Show New Patient Form
router.get("/new",  isLoggedIn, (req, res) => res.render("./patients/new"));

// CREATE - Create New Patient then redirect to patients
router.post("/",  isLoggedIn, (req, res) => {

    Patient.create(req.body.patient, (err, newPatient) => {
        if(err){
            console.log(err);
        } else {
            res.json(newPatient);
        }
    });
});

// SHOW - Show info about 1 patient
router.get("/:id", isLoggedIn, (req, res) => {
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

// SUPRECEEDED BY AJAX
// // EDIT - Show Edit Form for selected patient

// UPDATE - Update selected patient, then redirect
router.put("/:id",  isLoggedIn, (req, res) => {
    Patient.findByIdAndUpdate(req.params.id, req.body.patient, {new: true}, (err, updatedPatient) => {
        if (err){
            console.log(err); 
        } else {
            //json is redundant as not repainting DOM
            res.json(updatedPatient);
        }    
    });
});


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
