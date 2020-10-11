const Patient   = require("../models/patient");
const Clinical  = require("../models/clinical");
const moment    = require("moment");

module.exports = {
    // Clinical New
    async newItem(req, res, next){
        const foundPatient = await Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        res.render("./clinicals/new", {patient: foundPatient, moment: moment});	
    },
    // Clinical Create
    async createItem(req, res, next){
        const foundPatient = await Patient.findById(req.params.id);
        const newItem = await Clinical.create(req.body.item);
        foundPatient.clinicals.push(newClinical);
        foundPatient.save();
        res.redirect(`/patients/${foundPatient._id}/clinicals/${newClinical._id}?currentView=${res.locals.currentView}`);
    },

    // Clinical Show (proof of concept of parallel async requests)
    async showItem(req, res, next){
        const foundPatient = Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        const foundClinical = Clinical.findById(req.params.item_id);
        const data = await Promise.all([foundPatient, foundClinical]);

        res.render("./clinicals/show", {patient: data[0], item: data[1], moment: moment});		
    },

    // Clinical Update
    async updateItem(req, res, next){
        const updatedClinical = await Clinical.findByIdAndUpdate(req.params.clinical_id, req.body.clinical);
        res.json(updatedClinical);
    },
    // Clinical Destroy
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