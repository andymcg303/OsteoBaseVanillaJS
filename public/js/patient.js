const options = {valueNames: ['id', 'surname', 'firstname', 'dob', 'phonenumber']};
const patientTableRows = document.querySelectorAll('#patient-table tbody tr');

const patientTableList = new List('patients', options);

// helper function
const openPatientDetails = function() {
    const id = this.querySelector('.id').textContent;
    const urlParams = new URLSearchParams(window.location.search);
    const currentView = urlParams.get('currentView');
    window.location.assign(`patients/${id}?currentView=${currentView}`);
};

patientTableRows.forEach(row => {
    row.addEventListener('click', openPatientDetails);
});

// // PATIENT INDEX
const newPatientButton = document.querySelector('#new-patient-button');
const newPatientForm = document.querySelector('#new-patient-form');
const formControls = document.querySelectorAll('.form-control');
// Show New Patient form
newPatientButton.addEventListener('click', function(){
    newPatientForm.style.display = 'block';
    this.style.display = 'none';
});

// Hide new patient form on cancel
document.querySelector('#cancel-new-patient').addEventListener('click', () => {
    newPatientForm.style.display = 'none';
    formControls.forEach(el => el.value = '');
    newPatientButton.style.display = 'block';
});

// No JQuery Post new patient
newPatientForm.addEventListener('submit', e => {    
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPatientData = Object.fromEntries(formData.entries());    
    fetch('/patients', {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(newPatientData)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then((data) => {
        patientTableList.add({ 
            id: `${data._id}`,
            surname: `${data.surname}`,
            firstname: `${data.firstname}`,
            dob: `${moment(data.dob).format('DD/MM/YYYY')}`,
            phonenumber: `${data.phonenumber}`
        });
        formControls.forEach(el => el.value = '');
        newPatientForm.style.display = 'none';
        newPatientButton.style.display = 'block';                        
        // Add event listener to newly added row    
        const patientTable = document.querySelector('#patient-table');    
        const lastRow = patientTable.rows[patientTable.rows.length -1];
        lastRow.addEventListener('click', openPatientDetails);    
    });
});
