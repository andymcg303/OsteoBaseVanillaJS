const Patient = require('../models/patient');
const moment  = require("moment");

module.exports = {
    // Patients Index
    // *** INVESTIGATE IF THIS IF STATEMENT IS STILL REQUIRED with list.js doing the search **
    async getPatients(req, res, next){
        if(req.query.keyword) {
            // let escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            // const regex = new RegExp(escapeRegex(req.query.keyword), 'gi');
            // let foundPatients = await Patient.find({surname: regex});
            const foundPatients = await Patient.find({});
            res.json(foundPatients);
        } else {
            // if there wasn't any query string keyword then..
            const allPatients = await Patient.find({});
            // if(req.xhr) {
                // res.json(allPatients);
            // } else {
                res.render("./patients/index", {patients: allPatients, moment: moment});
            // }
        }
    },

    // Patients Create
    async createPatient(req, res, next){
        // this uses ajax and fetch api, so does not use express functionality that would require .patient after body
        const newPatient = await Patient.create(req.body);
        res.json(newPatient);
    },

    // Patient Show
    async showPatient(req, res, next){
        const foundPatient = await Patient.findById(req.params.id)
            .populate({
                path: 'medhists'
            }) 
            .populate({
                path: 'interviews'
            })                 
            .populate({
                path: 'clinicals'
            })
            .exec();
            if(req.xhr){
                res.json(foundPatient);
            } else {
                res.render("./patients/show", {patient: foundPatient, moment: moment});
            }
    },

    // Patient Update
    async updatePatient(req, res, next){
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedPatient);
    },

    // Patient Delete
    async deletePatient(req, res, next){
        const foundPatient = await Patient.findById(req.params.id);
        await foundPatient.remove();
        res.redirect(`/patients?currentView=${res.locals.currentView}&showHistory=${res.locals.showHistory}`);
    },

    // Patient Info only ie without populating assoc data
    async getPatientInfo(req, res, next){
        const foundPatient = await Patient.findById(req.params.id)
        res.json(foundPatient);
    },
}
