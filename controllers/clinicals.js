const CommonController    = require('./common-controller');
const Clinical  = require("../models/clinical");

class Clinicals extends CommonController {}

//I sense theres a better way to pass 'clinical_id' perhaps
module.exports = new Clinicals('clinicals', 'clinical_id', Clinical);
