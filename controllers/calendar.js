const User = require('../models/user');
const Patients = require('../models/patient');
const moment = require("moment"); 

module.exports = {

    async getCalendar(req, res, next){
        const foundUsers = await User.find({});
        const foundPatients = await Patients.find({}); 
        res.render('calendar/index', {users: foundUsers, patients: foundPatients, moment: moment});
    },
    
};