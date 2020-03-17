const Patient = require('../models/patient');
const moment  = require("moment");

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {
    // Patients Index
    async getPatients(req, res, next){
        if(req.query.keyword) {
            const regex = new RegExp(escapeRegex(req.query.keyword), 'gi');
            let foundPatients = await Patient.find({surname: regex});
            res.json(foundPatients);
        } else {
            // if there wasn't any query string keyword then..
            let allPatients = await Patient.find({});
            if(req.xhr) {
                res.json(allPatients);
            } else {
                res.render("./patients/index", {patients: allPatients, moment: moment});
            }
        }
    },

    // Patients New
    newPatient(req, res, next){
        res.render("./patients/new");
    },

    // Patients Create
    async createPatient(req, res, next){
        let newPatient = await Patient.create(req.body.patient);
        res.json(newPatient);
    },

    // Patient Show
    async showPatient(req, res, next){
        let foundPatient = await Patient.findById(req.params.id)
            .populate("interviews")
            .populate("medhists")
            .populate("clinicals")
            .exec();
            res.render("./patients/show", {patient: foundPatient, moment: moment});
    },

    // Patient Update
    async updatePatient(req, res, next){
        let updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body.patient, {new: true});
        res.json(updatedPatient);
    }
}
