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
    
    // Create Appointment
    async createAppointment(req, res, next){
        // this uses ajax and fetch api so uses req.body
        const newAppointment = await Appointment.create(req.body);
        res.json(newAppointment);
    }
    
};