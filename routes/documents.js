const express       = require("express");
const router        = express.Router({mergeParams: true});
const multer        = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn, 
        errorHandler } = require("../middleware");
const { getDocuments,
        showDocument,   
        createDocuments,
        destroyDocument } = require('../controllers/documents'); 

// // ROUTES   
// // INDEX - List all documents      
router.get("/", isLoggedIn, errorHandler(getDocuments));

// Create Documents
router.post("/",  isLoggedIn, upload.array('documents'), errorHandler(createDocuments));

// // SHOW - Show 1 document
router.get("/:document_id", isLoggedIn, errorHandler(showDocument));

// // DESTROY - Delete Document
router.delete("/:document_id",  isLoggedIn, errorHandler(destroyDocument));

module.exports = router;