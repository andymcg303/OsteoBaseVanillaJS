const User = require('../models/user'); 

module.exports = {

    async getCalendar(req, res, next){
        const foundUsers = await User.find({}); 
        res.render('calendar/index', {users: foundUsers});
    },

    async getCalendarList(req, res, next){
        const foundUsers = await User.find({});
        res.json(foundUsers);
    }
};