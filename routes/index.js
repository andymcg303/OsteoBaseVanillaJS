const express   = require("express"),
      router    = express.Router();       

// Root Landing Page Route   
router.get("/", (req, res) => res.render("login"));

// Show Login Form
router.get("/signup", function(req, res){
	res.render("signup");
})

module.exports = router;