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

	// Preserve the current patient view type as chosen by the user 
	viewType: (req, res, next) =>	{
		res.locals.currentView = req.query.currentView;
		next();
	}
}