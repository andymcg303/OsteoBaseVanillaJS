const Patient   = require('../models/patient');
const Document = require('../models/document');
const moment    = require('moment');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'andymcg303',
    api_key: '297314977141138',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
    // Documents Index
    async getDocuments(req, res, next){
        let foundPatient = await Patient.findById(req.params.id).
            populate('documents').exec();
        res.render('documents/index', { patient: foundPatient });
    },

    // Documents Create
    async createDocuments(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        for (const file of req.files){
            let image = await cloudinary.v2.uploader.upload(file.path);
            let newImage =  await Document.create( {url: image.secure_url, public_id: image.public_id} );  
            foundPatient.documents.push(newImage);
            foundPatient.save();
        }
        res.redirect(`/patients/${foundPatient.id}/documents`);
    },

    // Document Show
    async showDocument(req, res, next){
        let foundPatient = await Patient.findById(req.params.id); 
        let foundDocument = await Document.findById(req.params.document_id);
        res.render('./documents/show', {document: foundDocument, patient: foundPatient, moment: moment});
    }

}

