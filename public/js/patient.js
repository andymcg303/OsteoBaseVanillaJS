const options = {valueNames: ['surname', 'firstname', 'dob', 'phonenumber']};
const patientTable = new List('patients', options);
const patientTableRow = document.querySelectorAll('#patient-table tbody tr');

patientTableRow.forEach(row => {
    row.addEventListener('click', function() {
        const id = this.querySelector('.id').textContent;
        const urlParams = new URLSearchParams(window.location.search);
        const currentView = urlParams.get('currentView');
        window.location.assign(`patients/${id}?currentView=${currentView}`);
    });
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
        $patientTable.row.add( [ 
            `${data._id}`,
            `${data.surname}`,
            `${data.firstname}`,
            `${moment(data.dob).format('DD/MM/YYYY')}`,
            `${data.phonenumber}`] )
        .draw();
        formControls.forEach(el => el.value = '');
        newPatientForm.style.display = 'none';
        newPatientButton.style.display = 'block';                    
    });
});
