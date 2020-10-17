
const CommonController    = require('./common-controllersOLD');
const Medhist 	= require("../models/medhist");

class Medhists extends CommonController {}

module.exports = new Medhists('medhists', 'medhist_id', Medhist);