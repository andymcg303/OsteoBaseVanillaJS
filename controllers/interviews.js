const Patient   	= require("../models/patient");
const Interview 	= require("../models/interview");
const moment		= require("moment");

module.exports = {
    // Interview New
    async newInterview(req, res, next) {
        const foundPatient = await Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        res.render("./interviews/new", {patient: foundPatient, moment: moment});	
    },

    // Interview Create
    async createInterview(req, res, next){
        const foundPatient = await Patient.findById(req.params.id);
        const newInterview = await Interview.create(req.body.interview);
        foundPatient.interviews.push(newInterview);
        foundPatient.save();
        res.redirect(`/patients/${foundPatient._id}/interviews/${newInterview._id}?currentView=${res.locals.currentView}`);
    },
    
    // Interview Show
    async showInterview(req, res, next){
        const foundPatient = await Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        const foundInterview = await Interview.findById(req.params.interview_id);
        res.render("./interviews/show", {patient: foundPatient, interview: foundInterview, moment: moment});		
    },

    // Interview Update
    async updateInterview(req, res, next){
        const updatedInterview = await Interview.findByIdAndUpdate(req.params.interview_id, req.body.interview);
        res.json(updatedInterview);
    },

    // Interview Destroy
    async destroyInterview(req, res, next){
        const patientId = req.params.id;
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