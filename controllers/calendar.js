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
        const foundAppointments = await Appointment.find({});
        res.json(foundAppointments);
    },
    
    // Create Appointment
    async createAppointment(req, res, next){
        // this uses ajax and fetch api so uses req.body
        const newAppointment = await Appointment.create({
            practitioner: req.body.practitioner,
            patient: req.body.patient,
            type: req.body.type,
            start: new Date(`${moment(req.body.apptdate).format('YYYY-MM-DD')} ${req.body.starttime}`),
            end: new Date(`${moment(req.body.apptdate).format('YYYY-MM-DD')} ${req.body.endtime}`)
        });
        res.json(newAppointment);
    },

    // Update Appointment
    async updateAppointment(req, res, next){
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.appt_id, {
                practitioner: req.body.practitioner,
                patient: req.body.patient,
                type: req.body.type,
                start: new Date(`${moment(req.body.apptdate).format('YYYY-MM-DD')} ${req.body.starttime}`),
                end: new Date(`${moment(req.body.apptdate).format('YYYY-MM-DD')} ${req.body.endtime}`)},
            {new: true});
        res.json(updatedAppointment);
    },

    // Delete Appointment
    async deleteAppointment(req, res, next){
        const appointment = await Appointment.findById(req.params.appt_id);
        const deletedAppointment = await appointment.deleteOne();
        res.json(deletedAppointment); 
    },

    // Get Appointment Abbreviation
    async getApptAbbrv(req, res, next){
        const foundApptAbbrv = await ApptTypes.findOne({ type: `${req.params.appt_type}`} ); 
        res.json(foundApptAbbrv);
    }
    
};