// Contains all the middleware

// var middlewareObj = {};

// middlewareObj.isLoggedIn = function(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
//     }
    
// 	res.redirect("/login");	
// }

// module.exports = middlewareObj;

module.exports = {
	isLoggedIn: (req, res, next) => {
		if(req.isAuthenticated()){
			return next();
		}
		
		res.redirect("/login");	
	}, 
    errorHandler: (fn) => 
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        
    }
}