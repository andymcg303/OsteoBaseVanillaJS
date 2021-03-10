const Patient       = require("../models/patient");
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
        const newItem = await res.locals.Model.create(req.body.item);
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
        const foundItem = res.locals.Model.findById(req.params.item_id);
        const data = await Promise.all([foundPatient, foundItem]);

        res.render(`./${res.locals.itemType}/show`, {patient: data[0], item: data[1], moment: moment});		
    },

    // Update
    async updateItem(req, res){
        const updatedItem = await res.locals.Model.findByIdAndUpdate(req.params.item_id, req.body);
        res.json(updatedItem);
    },
    // Destroy
    async destroyItem(req, res){
        const patientId = req.params.id;

        await res.locals.Model.findByIdAndRemove(req.params.item_id);
        await Patient.findByIdAndUpdate(patientId,
                    {
                        $pull: res.locals.pullObj 
                    }                    
                );
        res.redirect(`/patients/${patientId}?currentView=${res.locals.currentView}`);
    }
}