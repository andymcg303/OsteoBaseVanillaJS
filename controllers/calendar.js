const User = require('../models/user'); 

module.exports = {

    getCalendar(req, res, next){ 
        res.render('calendar/index');
    },

    async getCalendarList(req, res, next){
        const foundUsers = await User.find({});
        res.json(foundUsers);
    }
};