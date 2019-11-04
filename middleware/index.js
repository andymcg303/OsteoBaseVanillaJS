// Contains all the middleware

var middlewareObj = {};

middlewareObj.checkboxBooleans = function(req, res, next){
    next();
};

module.exports = middlewareObj;