const User = require('../models/user');
const Patients = require('../models/patient');
const ApptTypes = require('../models/appttype');
const Appointment = require('../models/appointment');
const moment = require("moment"); 

module.exports = {

    // Get Calendar Data
    async getCalendar(req, res, next){
        const foundUsers = await User.find({});
        const foundPatients = await Patients.find({});
        const foundApptTypes = await ApptTypes.find({}); 
        res.render('calendar/index', {
            users: foundUsers, 
            patients: foundPatients, 
            appttypes: foundApptTypes, 
            moment: moment
        });
    },

    // Get All Appointments
    async getAppointments(req, res, next){
        try {
            const foundAppointments = await Appointment.find({});
            res.json(foundAppointments);
        } catch {
            res.status(500).json({ error: err });
        }
    },
    
    // Create Appointment
    async createAppointment(req, res, next){
        // this uses ajax and fetch api so uses req.body
        try {
            const newAppointment = await Appointment.create({
                practitioner: req.body.practitioner,
                patient: req.body.patient,
                type: req.body.type,
                start: new Date(`${moment(req.body.apptdate).format('YYYY-MM-DD')} ${req.body.starttime}`),
                end: new Date(`${moment(req.body.apptdate).format('YYYY-MM-DD')} ${req.body.endtime}`)
            });
            res.json(newAppointment);
        } catch {
            res.status(500).json({ error: err });
        }
    },

    // Update Appointment
    async updateAppointment(req, res, next){
        try {
            const updatedAppointment = await Appointment.findByIdAndUpdate(
                req.params.appt_id, {
                    practitioner: req.body.practitioner,
                    patient: req.body.patient,
                    type: req.body.type,
                    start: new Date(`${moment(req.body.apptdate).format('YYYY-MM-DD')} ${req.body.starttime}`),
                    end: new Date(`${moment(req.body.apptdate).format('YYYY-MM-DD')} ${req.body.endtime}`)},
                {new: true});
            if (updatedAppointment) {        
                return res.json(updatedAppointment);
            };
            throw new Error (`Data with ${req.params.appt_id} not found.`);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    // Delete Appointment
    async deleteAppointment(req, res, next){
        try {
            const appointment = await Appointment.findById(req.params.appt_id);
            const deletedAppointment = await appointment.deleteOne();
            res.json(deletedAppointment); 
        } catch(err) { 
            res.status(500).json({ error: err });
        } 
    },

    // Get Appointment Abbreviation
    async getApptAbbrv(req, res, next){
        try {
            const foundApptAbbrv = await ApptTypes.findOne({ value: `${req.params.appt_type}`} ); 
            res.json(foundApptAbbrv);
        } catch {
            res.status(500).json({ error: err });
        }
    }
    
};