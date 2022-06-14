const { randPastDate,
        randFirstName,
        randLastName,
        randEmail,
        randStreetAddress,
        randZipCode,
        randPhoneNumber,
        randWord } = require('@ngneat/falso');

const Patient = require('./models/patient');
const Medhist = require('./models/medhist');
const Interview = require('./models/interview');
const Clinical = require('./models/clinical');

 async function seedPatients() {

    console.log('Please wait, creating patients...');

     await Patient.deleteMany({});
     await Medhist.deleteMany({});
     await Interview.deleteMany({});
     await Clinical.deleteMany({});

 	   for(const i of new Array(100)) {
 			const patient = {
                 date_created: randPastDate(), 		
                 firstname: randFirstName(),
                 surname: randLastName(),
                 dob: randPastDate(),
                 address: randStreetAddress(),
                 postcode: randZipCode(),
                 phonenumber: randPhoneNumber(),
                 email: randEmail()
             }    
 			const newPatient = await Patient.create(patient);
    
            const medhist = {
                date_created: randPastDate(),
                meds: randWord(),
                ops: randWord(),
                fracs: randWord(),
                accs: randWord(),
                ill: randWord(),
                resp: randWord(),
                cvs: randWord(),
                gu: randWord(),
                git: randWord(),
                gynae: randWord(),
                msk:randWord(),
                critical: randWord(),
                signed_off: false             
            }    

            const newMedhist = await Medhist.create(medhist);
            newPatient.medhists.push(newMedhist);            

            for (const k of new Array(3)){
                const interview = {
                    date_created: randPastDate(),
                    CO: randWord(),
                    onset: randWord(),
                    reason: randWord(),
                    agg: randWord(),
                    rel: randWord(),
                    dp: randWord(),
                    ph: randWord(),
                    invest: randWord(),
                    signed_off: false
                }
               const newInterview = await Interview.create(interview);
               newPatient.interviews.push(newInterview); 
            } 

            for (const l of new Array(5)){
                const clinical = {
                    date_created: randPastDate(),
                    problem: randWord(),
                    OE: randWord(),
                    diag: randWord(),
                    TTT: randWord(),
                    signed_off: false
                }
               const newClinical = await Clinical.create(clinical);
               newPatient.clinicals.push(newClinical);
               
            }
        
            newPatient.save(); 

        }
	console.log('New patients created');
}

module.exports = seedPatients;

// const Type = require('./models/appttype');

// async function seedTypes() {

//     console.log('Please wait, creating appt types...');

//     let type = {
//         // date_created: faker.date.past(), 		
//         value: 'existing',
//         type: 'Existing Patient',
//         duration: 30,
//         price: 50
//     }  
//     let newType = await Type.create(type);

//     newType.save();

//     type = {
//         // date_created: faker.date.past(), 		
//         value: 'new',
//         type: 'New Patient',
//         duration: 60,
//         price: 60
//     }  
//     newType = await Type.create(type);

//     newType.save();

//     type = {
//         // date_created: faker.date.past(), 		
//         value: 'double',
//         type: 'Double Appointment',
//         duration: 60,
//         price: 100
//     }  
//     newType = await Type.create(type);

//     newType.save();

//     console.log('Appt Types created');

// }

// module.exports = seedTypes;
             