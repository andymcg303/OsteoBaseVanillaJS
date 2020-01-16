// PATIENT INDEX
let $newPatientButton = $('#new-patient-button'),
    $newPatientForm = $('#new-patient-form');

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

// SHOW/EDIT FUNCTIONALITY
let $editForm = $('.edit-form'),
    $editButton = $('.edit-button'),
    $editFormControls = $('.edit-form .form-control'),
    $submitEditButton = $('.submit-edit-button'),
    $cancelEditButton = $('.cancel-edit-button'),
    $deleteButton = $('.delete-button'),
    $deleteForm = $('.delete-form'),
    $deletePatientForm = $('#delete-patient-form');

// Enable Edit form and buttons
$editButton.click(function(){
    $(this).toggle();
    $submitEditButton.toggle();
    $cancelEditButton.css('display', 'inline-block');
    $deleteButton.css('display', 'inline-block');
    $editFormControls.prop('disabled',false);
});

function disableEditForm(){
    $submitEditButton.toggle();
    $cancelEditButton.toggle();
    $editButton.toggle();
    $deleteButton.toggle();
    $editFormControls.prop('disabled',true);
}

// Disable Edit functionaity
$cancelEditButton.click(function(){
    $editFormControls.each(function(){
        $(this).val($(this).prop('defaultValue'));
    }); 
    disableEditForm();
});

// Submit Edit Details
$editForm.submit(function(e){
    e.preventDefault();
    let $data = $(this).serialize();
    let $formAction = $(this).attr('action');
    $.ajax({
        url: $formAction,
        data: $data,
        method: 'PUT',
        complete: disableEditForm()
    });    
});

// DELETE FUNCTIONALITY --- Only use AJAX for a confirm prompt 
$deleteForm.submit(function(e){
    let confirmResponse = confirm('Are you sure?');
    if (!confirmResponse) {
        e.preventDefault();
    }
});

// Deleting patients is a special case
$deletePatientForm.submit(function(e){
    let confirmResponse = confirm('This will delete all the patients details including clinical details which by law you are required to keep for 6 years. Are you sure?');
    if (!confirmResponse) {
        e.preventDefault();
    }
});

// Search on patients surname functionality
$('#search').submit(function(e){
	e.preventDefault();
	$.get('/patients?keyword=' + encodeURIComponent($('#search-text').val()), function (data) {
		$('#patient-list').html('');
		data.forEach(function (patient) {
            $('#patient-list').append(
                `<a class="list-group-item list-group-item-action list-group-item-light" href="/patients/${patient._id}">${patient.firstname} ${patient.surname}<span class="float-right">${moment(patient.dob).format('DD/MM/YYYY')}</span></a>`
            );
        });    
    });
});
