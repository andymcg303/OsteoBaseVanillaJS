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
const Appointment = require('./models/appointment');

async function seedPatients() {

console.log('Please wait, creating patients...');

    await Patient.deleteMany({});
    await Medhist.deleteMany({});
    await Interview.deleteMany({});
    await Clinical.deleteMany({});
    await Appointment.deleteMany({});

    const patients = {
        date_created: randPastDate({length: 100}), 		
        firstname: randFirstName({length: 100}, { withAccents: false }),
        surname: randLastName({length: 100}, { withAccents: false }),
        dob: randPastDate({length: 100}),
        address: randStreetAddress({length: 100}),
        postcode: randZipCode({length: 100}),
        phonenumber: randPhoneNumber({length: 100}),
        email: randEmail({length: 100})
    };    

    for (i = 0; i < patients['date_created'].length; i++){
        const patient = {};
        for (const property in patients) {
            patient[property] = patients[property][i];
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

        const interviews = {
            date_created: randPastDate({length: 3}),
            CO: randWord({length: 3}),
            onset: randWord({length: 3}),
            reason: randWord({length: 3}),
            agg: randWord({length: 3}),
            rel: randWord({length: 3}),
            dp: randWord({length: 3}),
            ph: randWord({length: 3}),
            invest: randWord({length: 3}),
            signed_off: [false, false, false]
        }

        for (j = 0; j < interviews['date_created'].length; j++){
            const interview = {};
            for (const property in interviews) {
                interview[property] = interviews[property][j];
            }

            const newInterview = await Interview.create(interview);
            newPatient.interviews.push(newInterview); 
        }

        const clinicals = {
            date_created: randPastDate({length: 5}),
            problem: randWord({length: 5}),
            OE: randWord({length: 5}),
            diag: randWord({length: 5}),
            TTT: randWord({length: 5}),
            signed_off: [false, false, false, false, false]
        }

        for (k = 0; k < clinicals['date_created'].length; k++){
            const clinical = {};
            for (const property in clinicals) {
                clinical[property] = clinicals[property][k];
            }

            const newClinical = await Clinical.create(clinical);
            newPatient.clinicals.push(newClinical); 
        }       

        newPatient.save();

    }

    console.log('New patients created');

}

module.exports = seedPatients;