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
        foundPatient.clinicals.push(newItem);
        foundPatient.save();
        res.redirect(`/patients/${foundPatient._id}/${res.locals.itemType}/${newItem._id}?currentView=${res.locals.currentView}`);
    },

    // Show (proof of concept of parallel async requests)
    async showItem(req, res, next){
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
    async updateItem(req, res, next){
        const updatedClinical = await Clinical.findByIdAndUpdate(req.params.item_id, req.body.item);
        res.json(updatedClinical);
    },
    // Destroy
    async destroyItem(req, res, next){
        const patientId = req.params.id;
        await Clinical.findByIdAndRemove(req.params.clinical_id);
        await Patient.findByIdAndUpdate(patientId,
                    {
                        $pull: {
                            clinicals: req.params.clinical_id
                        }
                    });
        res.redirect(`/patients/${patientId}?currentView=${res.locals.currentView}`);
    }
}