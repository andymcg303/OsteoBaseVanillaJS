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
        res.render('documents/index', { patient: foundPatient, moment: moment });
    },

    // Create Documents Upload
    async createDocuments(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        
        for (const file of req.files){
            let doc = await cloudinary.v2.uploader.upload(file.path);
            let newDoc =  await Document.create( {url: doc.secure_url, public_id: doc.public_id, file_name: file.originalname} );  
            foundPatient.documents.push(newDoc);
            foundPatient.save();
        }
        res.redirect(`/patients/${foundPatient.id}/documents`);
    },

    // Document Show
    async showDocument(req, res, next){
        let foundPatient = await Patient.findById(req.params.id); 
        let foundDocument = await Document.findById(req.params.document_id);
        res.render('./documents/show', {document: foundDocument, patient: foundPatient, moment: moment});
    },

    // Document Destroy
    async destroyDocument(req, res, next){
        let patientId = req.params.id;
        let document = await Document.findById(req.params.document_id);
        await cloudinary.v2.uploader.destroy(document.public_id);
        await document.deleteOne();
        await Patient.findByIdAndUpdate(patientId,
            {
                $pull: {
                    documents: req.params.document_id
                }
            })
        if (req.xhr){
            res.json(document);
        } else {
            res.redirect(`/patients/${patientId}/documents`);
        }
    }
}

