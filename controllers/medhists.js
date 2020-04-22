const Patient   = require("../models/patient");
const Medhist 	= require("../models/medhist");
const moment  	= require("moment");

module.exports = {

    // Medhist New
    async newMedhist(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        res.render("./medhists/new", {patient: foundPatient});
    },

    // Medhist Create
    async createMedhist(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        let newMedhist = await Medhist.create(req.body.medhist);
        foundPatient.medhists.push(newMedhist);
        foundPatient.save();
        res.redirect(`/patients/${foundPatient._id}/medhists/${newMedhist._id}?currentView=${res.locals.currentView}`);
    },

    // Medhist Show
    async showMedhist(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        let foundMedhist = await Medhist.findById(req.params.medhist_id);
        res.render("./medhists/show", {patient: foundPatient, medhist: foundMedhist, moment: moment});		
    },

    // Medhist Update
    async updateMedhist(req, res, next){
        let updatedMedhist = await Medhist.findByIdAndUpdate(req.params.medhist_id, req.body.medhist);
        res.json(updatedMedhist);
    },

    // Medhist Destroy
    async destroyMedhist(req, res, next){
        let patientId = req.params.id;
        await Medhist.findByIdAndRemove(req.params.medhist_id);
        await Patient.findByIdAndUpdate(patientId,
            {
                $pull: {
                    medhists: req.params.medhist_id
                }
            });
        res.redirect(`/patients/${patientId}?currentView=${res.locals.currentView}`);    
    }       
}