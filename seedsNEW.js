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

const numPatients = 100;
const numInterviews = 3;
const numClinicals = 5;

async function seedPatients() {

console.log('Please wait, creating patients...');

    await Patient.deleteMany({});
    await Medhist.deleteMany({});
    await Interview.deleteMany({});
    await Clinical.deleteMany({});
    await Appointment.deleteMany({});

    const patients = {
        date_created: randPastDate({length: numPatients}), 		
        firstname: randFirstName({length: numPatients}, { withAccents: false }),
        surname: randLastName({length: numPatients}, { withAccents: false }),
        dob: randPastDate({length: numPatients}),
        address: randStreetAddress({length: numPatients}),
        postcode: randZipCode({length: numPatients}),
        phonenumber: randPhoneNumber({length: numPatients}),
        email: randEmail({length: numPatients})
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
            date_created: randPastDate({length: numInterviews}),
            CO: randWord({length: numInterviews}),
            onset: randWord({length: numInterviews}),
            reason: randWord({length: numInterviews}),
            agg: randWord({length: numInterviews}),
            rel: randWord({length: numInterviews}),
            dp: randWord({length: numInterviews}),
            ph: randWord({length: numInterviews}),
            invest: randWord({length: numInterviews}),
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
            date_created: randPastDate({length: numClinicals}),
            problem: randWord({length: numClinicals}),
            OE: randWord({length: numClinicals}),
            diag: randWord({length: numClinicals}),
            TTT: randWord({length: numClinicals}),
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