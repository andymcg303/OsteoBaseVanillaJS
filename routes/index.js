const express   = require("express"),
      router    = express.Router();       

// Root Landing Page Route   
router.get("/", (req, res) => res.render("login"));

module.exports = router;