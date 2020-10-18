const User = require('../models/user');
const Medhist = require('../models/medhist');
const Interview = require('../models/interview');
const Clinical  = require('../models/clinical');

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
		const user = await User.findById(req.user._id);
		res.locals.userType = user.user_type;
		next();
	}, 

	isAuthorised : async (req, res, next) => {
		const user = await User.findById(req.user._id);
		if (user.user_type  !== "Reception") return next();
		req.session.error = 'Access Denied';
		// res.redirect('back');
		res.redirect(`/patients/${req.params.id}?currentView=${req.query.currentView}`); 
	}, 

	// Preserve the current patient view type as chosen by the user 
	viewType: (req, res, next) =>	{
		res.locals.currentView = req.query.currentView;
		next();
	},

	// Preserve the item type of the request for setting paths, Model and Pull Object in common controllers
	itemType: (req, res, next) => { 
		const str = req.baseUrl.split("/");  
		res.locals.itemType = str[str.length - 1];

		if (res.locals.itemType === 'medhists'){
			res.locals.Model = Medhist;
			res.locals.pullObj = {medhists: req.params.item_id};
        } else if (res.locals.itemType === 'interviews'){ 
			res.locals.Model = Interview;
			res.locals.pullObj = {interviews: req.params.item_id};
        } else if (res.locals.itemType === 'clinicals'){
			res.locals.Model = Clinical;
			res.locals.pullObj = {clinicals: req.params.item_id};
        }
		next();
	}

}