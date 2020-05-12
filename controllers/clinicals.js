const Patient   = require("../models/patient");
const Clinical  = require("../models/clinical");
const moment    = require("moment");

module.exports = {

    // Clinical New
    async newClinical(req, res, next){
        const foundPatient = await Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        res.render("./clinicals/new", {patient: foundPatient, moment: moment});	
    },

    // Clinical Create
    async createClinical(req, res, next){
        const foundPatient = await Patient.findById(req.params.id);
        const newClinical = await Clinical.create(req.body.clinical);
        foundPatient.clinicals.push(newClinical);
        foundPatient.save();
        res.redirect(`/patients/${foundPatient._id}/clinicals/${newClinical._id}?currentView=${res.locals.currentView}`);
    },

    // Clinical Show
    async showClinical(req, res, next){
        const foundPatient = await Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        const foundClinical = await Clinical.findById(req.params.clinical_id);
        res.render("./clinicals/show", {patient: foundPatient, clinical: foundClinical, moment: moment});		
    },

    // Clinical Update
    async updateClinical(req, res, next){
        const updatedClinical = await Clinical.findByIdAndUpdate(req.params.clinical_id, req.body.clinical);
        res.json(updatedClinical);
    },

    // Clinical Destroy
    async destroyClinical(req, res, next){
        const patientId = req.params.id;
        await Clinical.findByIdAndRemove(req.params.clinical_id);
        await Patient.findByIdAndUpdate(patientId,
                    {
                        $pull: {
                            clinicals: req.params.clinical_id
                        }
                    });
        res.redirect(`/patients/${patientId}?currentView=${res.locals.currentView}`);

    }
}