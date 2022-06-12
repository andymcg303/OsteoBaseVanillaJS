const User = require('../models/user');
const passport = require('passport');

module.exports = {
    async postRegister(req, res, next){
        console.log('registering user');
        const newUser = new User({
           username: req.body.username,
           user_type: req.body.user_type,
           calendar_color: req.body.calendar_color 
        //   email: req.body.email,
        //   image: req.body.image
        });
        
        await User.register(newUser, req.body.password);
        
        res.redirect('/patients');
    },

    postLogin(req, res, next){
        passport.authenticate('local',
            {
                // successRedirect: '/patients?currentView=log&showHistory=false',
                successRedirect: '/calendar?currentView=log&showHistory=false',
                failureRedirect: '/login',
            }
        )(req, res, next);
    },

    getLogout(req, res){
        req.logout(() => {
            res.redirect('/login');
        });
    }
}