const express       = require("express");
const router        = express.Router({mergeParams: true});
const multer        = require('multer');
const upload        = multer({dest: './uploads/'});
const { isLoggedIn, 
        errorHandler } = require("../middleware");
const { getDocuments,
        showDocument,   
        updateDocuments } = require('../controllers/documents'); 
//         showPatient, 
//         updatePatient,
//         deletePatient } 

// // ROUTES   
// // INDEX - List all documents      
router.get("/", isLoggedIn, errorHandler(getDocuments));

// Update Documents - ie Delete and Create Documents
router.put("/",  isLoggedIn, upload.array('documents'), errorHandler(updateDocuments));

// // SHOW - Show 1 document
router.get("/:document_id", isLoggedIn, errorHandler(showDocument));

// // DESTROY - Delete patient. Deleting child data handled in model
// router.delete("/:id",  isLoggedIn, errorHandler(deletePatient));

module.exports = router;