const Controller    = require('./controller');
const Interview 	= require("../models/interview");

class Interviews extends Controller {}

//I sense theres a better way to pass 'interview_id' perhaps
module.exports = new Interviews('interviews', 'interview_id', Interview); 