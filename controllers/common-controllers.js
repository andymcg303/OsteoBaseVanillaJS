const Patient       = require("../models/patient");
const { getModel } = require("./helpers");
const moment        = require("moment");

module.exports = {
    // New
    async newItem(req, res, next){
        const foundPatient = await Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        res.render(`./${res.locals.itemType}/new`, {patient: foundPatient, moment: moment});	
    },
    // Create
    async createItem(req, res, next){
        const foundPatient = await Patient.findById(req.params.id);
        const Model = getModel(res.locals.itemType);
        const newItem = await Model.create(req.body.item);
        foundPatient[`${res.locals.itemType}`].push(newItem);
        foundPatient.save();
        res.redirect(`/patients/${foundPatient._id}/${res.locals.itemType}/${newItem._id}?currentView=${res.locals.currentView}`);
    },

    // Show (proof of concept of parallel async requests)
    async showItem(req, res){
        const foundPatient = Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        const Model = getModel(res.locals.itemType);
        const foundItem = Model.findById(req.params.item_id);
        const data = await Promise.all([foundPatient, foundItem]);

        res.render(`./${res.locals.itemType}/show`, {patient: data[0], item: data[1], moment: moment});		
    },

    // Update
    async updateItem(req, res){
        const Model = getModel(res.locals.itemType);
        const updatedItem = await Model.findByIdAndUpdate(req.params.item_id, req.body.item);
        res.json(updatedItem);
    },
    // Destroy
    async destroyItem(req, res){
        const patientId = req.params.id;
        let pullObj;

        if (res.locals.itemType === 'medhists'){
            pullObj = {medhists: req.params.item_id};
        } else if (res.locals.itemType === 'interviews'){ 
            pullObj = {interviews: req.params.item_id};
        } else if (res.locals.itemType === 'clinicals'){
            pullObj = {clinicals: req.params.item_id};
        }

        const Model = getModel(res.locals.itemType);
        await Model.findByIdAndRemove(req.params.item_id);
        await Patient.findByIdAndUpdate(patientId,
                    {
                        $pull: pullObj 
                    }                    
                );
        res.redirect(`/patients/${patientId}?currentView=${res.locals.currentView}`);
    }
}