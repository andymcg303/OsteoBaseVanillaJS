const Patient   	= require("../models/patient");
const Interview 	= require("../models/interview");
const moment		= require("moment");

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
        res.redirect(`/patients/${foundPatient._id}/interviews/${newInterview._id}?currentView=${res.locals.currentView}`);
    },
    
    // Interview Show
    async showInterview(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        let foundInterview = await Interview.findById(req.params.interview_id);
        res.render("./interviews/show", {patient: foundPatient, interview: foundInterview, moment: moment});		
    },

    // Interview Update
    async updateInterview(req, res, next){
        let updatedInterview = await Interview.findByIdAndUpdate(req.params.interview_id, req.body.interview);
        res.json(updatedInterview);
    },

    // Interview Destroy
    async destroyInterview(req, res, next){
        let patientId = req.params.id;
        await Interview.findByIdAndRemove(req.params.interview_id);
        await Patient.findByIdAndUpdate(patientId,
            {
                $pull: {
                    interviews: req.params.interview_id
                }
            }),
        res.redirect(`/patients/${patientId}?currentView=${res.locals.currentView}`);
    }
}