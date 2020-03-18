const Patient   	= require("../models/patient");
const Interview 	= require("../models/interview");

module.exports = {
    // Interview New
    async newInterview(req, res, next) {
        let foundPatient = await Patient.findById(req.params.id);
        res.render("./interviews/new", {patient: foundPatient});	
    },

    // Interview Create
    async createInterview(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        let newInterview = await Interview.create(req.body.interview);
        foundPatient.interviews.push(newInterview);
        foundPatient.save();
        res.redirect(`/patients/${foundPatient._id}/interviews/${newInterview._id}`);
    }  
}