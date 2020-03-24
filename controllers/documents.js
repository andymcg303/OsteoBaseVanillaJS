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
        let foundPatient = await Patient.findById(req.params.id);
        res.render('documents/index', { patient: foundPatient });
    },

    // Documentss Create
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

    // // Documents New
    // async newDocument(req, res, next){
    //     let foundPatient = await Patient.findById(req.params.id);
    //     let newDocument = await Document.create();
    //     foundPatient.documents.push();
    //     foundPatient.save();
    //     res.redirect(`/patients/${foundPatient._id}/documents`);
    // }

}

