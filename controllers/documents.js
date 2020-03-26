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

    // Update Documents ie Delete and Upload
    async updateDocuments(req, res, next){
        let foundPatient = await Patient.findById(req.params.id);
        
// LOOK AT HOW INTERVIEWS ETC ARE DELETED

       // check if there's any images for deletion
    //    if(req.body.deleteDocuments && req.body.deleteDocuments.length){

    //        // assign deleteImages from req.body to its own variable
    //        let deleteDocuments = req.body.deleteDocuments;
    //        // loop over deleteImages
    //        for(const docId of deleteDocuments){
    //            // find doc to get public_id
    //            let docPubId = await Document.findById(docId);
    //            //  delete images from cloudinary
    //            await cloudinary.v2.uploader.destroy(docPubId.public_id);
    //            // delete document from foundPatient
    //            foundPatient.documents.ObjectID.forEach(function(document){
    //                if (document.id === docId){
    //                    let index = foundPatient.documents.indexOf(document);
    //                    foundPatient.documents.splice(index, 1);
    //                }
    //            }); 
    //        }    
    //    }
   
    //    // check if there are any new images for upload
    //    if (req.files) {
    //        // upload images
    //        for (const file of req.files){
    //            let image = await cloudinary.v2.uploader.upload(file.path);
    //            // add images to post.images array
    //            post.images.push({
    //                url: image.secure_url,
    //                public_id: image.public_id
    //            });
    //        }
    //    }


        for (const file of req.files){
            let doc = await cloudinary.v2.uploader.upload(file.path);
            let newDoc =  await Document.create( {url: doc.secure_url, public_id: doc.public_id} );  
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
    }

}

