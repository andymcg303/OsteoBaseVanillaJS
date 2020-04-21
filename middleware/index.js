const User = require('../models/user');

module.exports = {

	isLoggedIn : (req, res, next) => {
		if(req.isAuthenticated()){
			return next();
		}
		req.session.error = 'Please Login';
		res.redirect("/login");
	},

    asyncErrorHandler : (fn) => 
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        
	},

	getUserType :  async (req, res, next) => {
		let user = await User.findById(req.user._id);
		res.locals.userType = user.user_type;
		next();
	}, 

	// Preserve the current patient view type as chosen by the user 
	viewType: (req, res, next) =>	{
		res.locals.currentView = req.query.currentView;
		next();
	}
}