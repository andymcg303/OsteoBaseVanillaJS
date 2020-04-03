const Patient   = require("../models/patient");
const Clinical  = require("../models/clinical");
const moment    = require("moment");

module.exports = {

    // Clinical New
    async newClinical(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        res.render("./clinicals/new", {patient: foundPatient});	
    },

    // Clinical Create
    async createClinical(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        let newClinical = await Clinical.create(req.body.clinical);
        foundPatient.clinicals.push(newClinical);
        foundPatient.save();
        res.redirect(`/patients/${foundPatient._id}/clinicals/${newClinical._id}`);
    },

    // Clinical Show
    async showClinical(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        let foundClinical = await Clinical.findById(req.params.clinical_id);
        res.render("./clinicals/show", {patient: foundPatient, clinical: foundClinical, moment: moment});		
    },

    // Clinical Update
    async updateClinical(req, res, next){
        let updatedClinical = await Clinical.findByIdAndUpdate(req.params.clinical_id, req.body.clinical);
        res.json(updatedClinical);
    },

    // Clinical Destroy
    async destroyClinical(req, res, next){
        let patientId = req.params.id;
        await Clinical.findByIdAndRemove(req.params.clinical_id);
        await Patient.findByIdAndUpdate(patientId,
                    {
                        $pull: {
                            clinicals: req.params.clinical_id
                        }
                    });
        res.redirect(`/patients/${patientId}`);

    }
}