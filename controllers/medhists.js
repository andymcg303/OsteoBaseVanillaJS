
const CommonController    = require('./common-controller');
const Medhist 	= require("../models/medhist");

class Medhists extends CommonController {}

module.exports = new Medhists('medhists', 'medhist_id', Medhist);