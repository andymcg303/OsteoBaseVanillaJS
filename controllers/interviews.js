const CommonController    = require('./common-controllersOLD');
const Interview 	= require("../models/interview");

class Interviews extends CommonController {}

//I sense theres a better way to pass 'interview_id' perhaps
module.exports = new Interviews('interviews', 'interview_id', Interview); 