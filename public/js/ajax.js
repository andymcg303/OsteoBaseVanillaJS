// PATIENT INDEX
let $newPatientButton = $('#new-patient-button');
let $newPatientForm = $('#new-patient-form');

// Show New Patient form
$newPatientButton.click(function(){
    $newPatientForm.toggle();
    $(this).prop('disabled',true);
});

// Hide new patient form
$('#cancel-new-patient').click(function(){
    $newPatientButton.prop('disabled',false);
    $newPatientForm.toggle();
    $newPatientForm.find('.form-control').val('');
});

// Post new patient
$newPatientForm.submit(function(e){
    e.preventDefault();
    let $newPatientData = $(this).serialize();
    $.post('/patients', $newPatientData, function(data){
        $('#patient-list').append(
            `<a class="list-group-item list-group-item-action list-group-item-light" href="/patients/${data._id}">${data.firstname} ${data.surname}<span class="float-right">${moment(data.dob).format('DD/MM/YYYY')}</span></a>`
        );
        $newPatientForm.find('.form-control').val('');
        $newPatientButton.prop('disabled',false);
        $newPatientForm.toggle();    
    });
});

// SHOW/EDIT PATIENT
let $editPatientForm = $('#edit-patient-form');
let $editPatientButton = $('#edit-patient-button');
let $editPatientFormControls = $('#edit-patient-form .form-control');
let $submitEditPatientButton = $('#submit-edit-patient-button');
let $cancelEditPatientButton = $('#cancel-edit-patient-button');

// Enable Edit Patient form and buttons
$editPatientButton.click(function(){
    $(this).toggle();
    $submitEditPatientButton.toggle();
    $cancelEditPatientButton.css('display', 'inline-block');
    $editPatientFormControls.prop('disabled',false);
});

function disableEditForm(){
    $submitEditPatientButton.toggle();
    $cancelEditPatientButton.toggle();
    $editPatientButton.toggle();
    $editPatientFormControls.prop('disabled',true);
}

// Disable Edit Patient functionaity
$cancelEditPatientButton.click(function(){
    $editPatientFormControls.each(function(){
        $(this).val($(this).prop('defaultValue'));
    }); 
    disableEditForm();
});

// Edit Patient Details
$editPatientForm.submit(function(e){
    e.preventDefault();
    let $patientData = $(this).serialize();
    let $formAction = $(this).attr('action');
    $.ajax({
        url: $formAction,
        data: $patientData,
        method: 'PUT',
        complete: function(){  
            disableEditForm();
        }
    });    
});