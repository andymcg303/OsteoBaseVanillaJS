const Patient   = require('../models/patient');
const Document = require('../models/document');
const moment    = require('moment');
const { cloudinary } = require('../cloudinary');

module.exports = {
    // Documents Index
    async getDocuments(req, res, next){
        const foundPatient = await Patient.findById(req.params.id).
            populate('documents').exec();
        res.render('documents/index', { patient: foundPatient, moment: moment });
    },

    // Create Documents Upload
    async createDocuments(req, res, next){
        const foundPatient = await Patient.findById(req.params.id);
        
        for (const file of req.files){
            const newDoc =  await Document.create( {url: file.secure_url, public_id: file.public_id, file_name: file.originalname} );  
            foundPatient.documents.push(newDoc);
        }
        await foundPatient.save();

        res.redirect(`/patients/${foundPatient.id}/documents?currentView=${res.locals.currentView}`);
    },

    // Document Show
    async showDocument(req, res, next){
        const foundPatient = await Patient.findById(req.params.id); 
        const foundDocument = await Document.findById(req.params.document_id);
        res.render('./documents/show', {document: foundDocument, patient: foundPatient, moment: moment});
    },

    // Document Destroy
    async destroyDocument(req, res, next){

        await destroyDocumentHelper(req);

        res.redirect(`/patients/${req.params.id}/documents?currentView=${res.locals.currentView}`);
    },

    async destroyMultipleDocs(req, res, next){
        
        destroyDocumentHelper(req);

        res.json({ success: true });
    }
}

const destroyDocumentHelper = async (req) => {
    const patientId = req.params.id;
    const document = await Document.findById(req.params.document_id);
    await cloudinary.v2.uploader.destroy(document.public_id);
    await document.deleteOne();
    await Patient.findByIdAndUpdate(patientId,
        {
            $pull: {
                documents: req.params.document_id
            }
        })        
}