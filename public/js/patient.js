// $.fn.dataTable.moment( 'DD/MM/YYYY' );

// // Patient Index DataTable initialisation
// const $patientTable = $('#patient-table').DataTable( {
//     "columnDefs":  
//         [{
//             "targets": [ 0 ],
//             "visible": false
//         }],
//         "order": [ 0, 'desc' ],
//         "lengthMenu": [[10, 20, -1], [10, 20, "All"]]
//     } );

// // Prevents flicker on loading
// $('#patient-table').show();    

// // open patient view
// $('#patient-table tbody').on('click', 'tr', function () {
//     const data = $patientTable.row( this ).data();
//     const urlParams = new URLSearchParams(window.location.search);
//     const currentView = urlParams.get('currentView');
//     window.location.assign(`patients/${data[0]}?currentView=${currentView}`);
// });

const options = {
    valueNames: ['id', 'surname', 'firstname', 'dob', 'phonenumber'],
}

const patientTable = new List('patients', options);

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
