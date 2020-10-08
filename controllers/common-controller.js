const Patient   	= require("../models/patient");
const moment		= require("moment");

module.exports = class Controller {

    constructor(path, item_id, Model){
        this.path = path;
        this.item_id = item_id; 
        this.Model = Model;
    }

    // New
    newItem = async (req, res, next) => {
        const foundPatient = await Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        res.render(`./${this.path}/new`, {patient: foundPatient, moment: moment});	
    }

    // Create
    createItem = async (req, res, next) => {
        const foundPatient = await Patient.findById(req.params.id);
        const newItem = await this.Model.create(req.body.item);
        foundPatient[`${this.path}`].push(newItem);
        foundPatient.save();
        res.redirect(`/patients/${foundPatient._id}/${this.path}/${newItem._id}?currentView=${res.locals.currentView}`);
    }
    
    // Show (proof of concept of parallel async await requests)
    showItem = async (req, res, next) => {
        const foundPatient = Patient.findById(req.params.id).populate({
            path: 'clinicals', 
            options: { sort: { '_id': -1 }}})
        .exec(); // populate all clinicals for the clinical history view
        const foundItem = this.Model.findById(req.params[`${this.item_id}`]);
        const data = await Promise.all([foundPatient, foundItem]);
        res.render(`./${this.path}/show`, {patient: data[0], item: data[1], moment: moment});		
    }

    // Update
    updateItem = async (req, res, next) => {
        const updatedItem = await this.Model.findByIdAndUpdate(req.params[`${this.item_id}`], req.body.item);
        res.json(updatedItem);
    }

    // Destroy
    destroyItem = async (req, res, next) => {
        const patientId = req.params.id;
        await this.Model.findByIdAndRemove(req.params[`${this.item_id}`]);
        await Patient.findByIdAndUpdate(patientId,
            {
                $pull: {
                    interviews: req.params[`${this.item_id}`]
                }
            }),
        res.redirect(`/patients/${patientId}?currentView=${res.locals.currentView}`);
    }
}