// const faker = require('faker');
// const Patient = require('./models/patient');
// const Medhist = require('./models/medhist');
// const Interview = require('./models/interview');
// const Clinical = require('./models/clinical');

// async function seedPatients() {

//     console.log('Please wait, creating patients...');

//     await Patient.deleteMany({});
//     await Medhist.deleteMany({});
//     await Interview.deleteMany({});
//     await Clinical.deleteMany({});

// 	for(const i of new Array(100)) {
// 			const patient = {
//                 date_created: faker.date.past(), 		
//                 firstname: faker.name.firstName(),
//                 surname: faker.name.lastName(),
//                 dob: faker.date.past(),
//                 address: faker.address.streetAddress(),
//                 postcode: faker.address.zipCode(),
//                 phonenumber: faker.phone.phoneNumber(),
//                 email: faker.internet.email()
//             }    
// 			const newPatient = await Patient.create(patient);
    
//             const medhist = {
//                 date_created: faker.date.past(),
//                 meds: faker.lorem.word(),
//                 ops: faker.lorem.word(),
//                 fracs: faker.lorem.word(),
//                 accs: faker.lorem.word(),
//                 ill: faker.lorem.word(),
//                 resp: faker.lorem.word(),
//                 cvs: faker.lorem.word(),
//                 gu: faker.lorem.word(),
//                 git: faker.lorem.word(),
//                 gynae: faker.lorem.word(),
//                 msk:faker.lorem.word(),
//                 critical: faker.lorem.word(),
//                 signed_off: false             
//             }    

//             const newMedhist = await Medhist.create(medhist);
//             newPatient.medhists.push(newMedhist);            

//             for (const k of new Array(3)){
//                 const interview = {
//                     date_created: faker.date.past(),
//                     CO: faker.lorem.word(),
//                     onset: faker.lorem.word(),
//                     reason: faker.lorem.word(),
//                     agg: faker.lorem.word(),
//                     rel: faker.lorem.word(),
//                     dp: faker.lorem.word(),
//                     ph: faker.lorem.word(),
//                     invest: faker.lorem.word(),
//                     signed_off: false
//                 }
//                const newInterview = await Interview.create(interview);
//                newPatient.interviews.push(newInterview); 
//             } 

//             for (const l of new Array(5)){
//                 const clinical = {
//                     date_created: faker.date.past(),
//                     problem: faker.lorem.word(),
//                     OE: faker.lorem.word(),
//                     diag: faker.lorem.word(),
//                     TTT: faker.lorem.word(),
//                     signed_off: false
//                 }
//                const newClinical = await Clinical.create(clinical);
//                newPatient.clinicals.push(newClinical);
               
//             }
        
//             newPatient.save(); 

//         }
// 	console.log('New patients created');
// }

// module.exports = seedPatients;

const Type = require('./models/appttype');

async function seedTypes() {

    let type = {
        // date_created: faker.date.past(), 		
        value: 'existing',
        type: 'Existing Patient',
        duration: 30,
        price: 50
    }  
    let newType = await Type.create(type);

    newType.save();

    type = {
        // date_created: faker.date.past(), 		
        value: 'new',
        type: 'New Patient',
        duration: 60,
        price: 60
    }  
    newType = await Type.create(type);

    newType.save();

    type = {
        // date_created: faker.date.past(), 		
        value: 'double',
        type: 'Double Appointment',
        duration: 60,
        price: 100
    }  
    newType = await Type.create(type);

    newType.save();

}

module.exports = seedTypes;
             