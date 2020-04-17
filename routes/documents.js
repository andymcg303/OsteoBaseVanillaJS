const express       = require("express");
const router        = express.Router({mergeParams: true});
const multer        = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn, 
        asyncErrorHandler } = require("../middleware");
const { getDocuments,
        showDocument,   
        createDocuments,
        destroyDocument } = require('../controllers/documents'); 

// // ROUTES   
// // INDEX - List all documents      
router.get("/", isLoggedIn, asyncErrorHandler(getDocuments));

// Create Documents
router.post("/",  isLoggedIn, upload.array('documents'), asyncErrorHandler(createDocuments));

// // SHOW - Show 1 document
router.get("/:document_id", isLoggedIn, asyncErrorHandler(showDocument));

// // DESTROY - Delete Document
router.delete("/:document_id",  isLoggedIn, asyncErrorHandler(destroyDocument));

module.exports = router;