const Patient   	= require("../models/patient");
const Medhist 	= require("../models/medhist");

module.exports = {

// Medhists New
async newMedhist(req, res, next){
    let foundPatient = await Patient.findById(req.params.id);
        res.render("./medhists/new", {patient: foundPatient});
    }
    
//     // router.get("/new", isLoggedIn, (req, res) => {
//     //     Patient.findById(req.params.id, (err, foundPatient) => {
//     //         if(err){
//     //            console.log(err);
//     //         } else {
//     //             res.render("./medhists/new", {patient: foundPatient});	
//     //         }
//     //     });
//     // });

//     // // Interview Create
//     // async createInterview(req, res, next){
//     //     let foundPatient = await Patient.findById(req.params.id);
//     //     let newInterview = await Interview.create(req.body.interview);
//     //     foundPatient.interviews.push(newInterview);
//     //     foundPatient.save();
//     //     res.redirect(`/patients/${foundPatient._id}/interviews/${newInterview._id}`);
//     // }  
}