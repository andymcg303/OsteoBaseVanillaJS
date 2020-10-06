const Controller    = require('./controller');
const Interview 	= require("../models/interview");

class Interviews extends Controller {}

module.exports = new Interviews('interviews', 'interview_id', Interview); //I sense theres a bettr way to pass 'interview_id' perhaps