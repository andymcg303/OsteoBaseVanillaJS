const Controller    = require('./controller');
const Clinical  = require("../models/clinical");

class Clinicals extends Controller {}

//I sense theres a better way to pass 'clinical_id' perhaps
module.exports = new Clinicals('clinicals', 'clinical_id', Clinical);
