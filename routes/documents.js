const express       = require("express");
const router        = express.Router({mergeParams: true});
const multer        = require('multer');
const upload        = multer({dest: './uploads/'});
const { isLoggedIn, 
        errorHandler } = require("../middleware");
const { getDocuments,
        // newDocument,   
        createDocuments } = require('../controllers/documents'); 
//         showPatient, 
//         updatePatient,
//         deletePatient } 

// // ROUTES   
// // INDEX - List all documents      
router.get("/", isLoggedIn, errorHandler(getDocuments));

// NEW - Show New Document Form
// router.get("/new",  isLoggedIn, newDocument);

// CREATE - Create New Documents
router.post("/",  isLoggedIn, upload.array('images', 4), errorHandler(createDocuments));

// // SHOW - Show info about 1 patient
// router.get("/:id", isLoggedIn, errorHandler(showPatient));

// // UPDATE - Update selected patient, then redirect
// router.put("/:id",  isLoggedIn, errorHandler(updatePatient));

// // DESTROY - Delete patient. Deleting child data handled in model
// router.delete("/:id",  isLoggedIn, errorHandler(deletePatient));

module.exports = router;