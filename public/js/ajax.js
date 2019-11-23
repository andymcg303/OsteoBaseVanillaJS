// PATIENT INDEX
let newPatientButton = $('#new-patient-button');
let newPatientForm = $('#new-patient-form');

// Show New Patient form
newPatientButton.click(function(){
    newPatientForm.toggle();
    $(this).prop('disabled',true);
});

// Hide new patient form
$('#cancel-new-patient').click(function(){
    newPatientButton.prop('disabled',false);
    newPatientForm.toggle();
});

// Submit new patient
newPatientForm.submit(function(e){
    e.preventDefault();
    let newPatientData = $(this).serialize();
    $.post('/patients', newPatientData, function(data){
        debugger;
        $('#patient-list').append(
            `<a class="list-group-item list-group-item-action list-group-item-light" href="/patients/${data._id}">${data.firstname} ${data.surname}<span class="float-right">${moment(data.dob).format('DD/MM/YYYY')}</span></a>`
        );
        newPatientForm.find('.form-control').val('');
        newPatientButton.prop('disabled',false);
        newPatientForm.toggle();    
    });
});

// SHOW/EDIT PATIENT
let editPatientButton = $('#edit-patient-button');
let submitNewPatientButton = $('#submit-new-patient-button');
let cancelNewPatientButton = $('#cancel-new-patient-button');

editPatientButton.prop('disabled',false);

// Enable Edit Patient form and buttons
editPatientButton.click(function(){
    $(this).toggle();
    submitNewPatientButton.toggle();
    cancelNewPatientButton.toggle();
});
