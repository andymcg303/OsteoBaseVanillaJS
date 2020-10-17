const Medhist   = require('../models/medhist');
const Interview = require('../models/interview');
const Clinical  = require('../models/clinical');

module.exports = {
    getModel(itemType){
        if (itemType === 'medhists'){
            return Medhist;
        } else if (itemType === 'interviews'){ 
            return Interview;
        } else if (itemType === 'clinicals'){
            return Clinical;
        }
    }
}