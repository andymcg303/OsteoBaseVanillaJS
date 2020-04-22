const express       = require("express");
const router        = express.Router({mergeParams: true});
const multer        = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn, 
        asyncErrorHandler,
        viewType } = require("../middleware");
const { getDocuments,
        showDocument,   
        createDocuments,
        destroyDocument } = require('../controllers/documents'); 

// // ROUTES   
// // INDEX - List all documents      
router.get("/", isLoggedIn, viewType, asyncErrorHandler(getDocuments));

// Create Documents
router.post("/",  isLoggedIn, viewType, upload.array('documents'), asyncErrorHandler(createDocuments));

// // SHOW - Show 1 document
router.get("/:document_id", isLoggedIn, viewType, asyncErrorHandler(showDocument));

// // DESTROY - Delete Document
router.delete("/:document_id", isLoggedIn, viewType, asyncErrorHandler(destroyDocument));

module.exports = router;