
const Controller    = require('./controller')
const Medhist 	= require("../models/medhist");

class Medhists extends Controller {}

module.exports = new Medhists('medhists', 'medhist_id', Medhist);