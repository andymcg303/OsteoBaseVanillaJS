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

// SHOW/EDIT FUNCTIONALITY
let $editForm = $('.edit-form'),
    $editButton = $('.edit-button'),
    $editFormControls = $('.edit-form .form-control'),
    $submitEditButton = $('.submit-edit-button'),
    $cancelEditButton = $('.cancel-edit-button'),
    $deleteButton = $('.delete-button'),
    $deleteForm = $('.delete-form'),
    $deletePatientForm = $('#delete-patient-form'),
    $signoffButton = $('.signoff-button');

// Enable Edit form and buttons
$editButton.click(function(){
    $(this).toggle();
    $submitEditButton.toggle();
    $signoffButton.toggle();
    $cancelEditButton.css('display', 'inline-block');
    $deleteButton.css('display', 'inline-block');
    $editFormControls.prop('disabled',false);
});

function disableEditForm(){
    $editButton.toggle();
    $signoffButton.toggle();
    $submitEditButton.hide();
    $cancelEditButton.hide();
    $deleteButton.hide();
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
    });
    disableEditForm();    
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

// SIGNOFF FUNCTIONALITY
// Show Edit button and Signoff button if not signed off
if ($('.edit-form .hidden-signed-off').val() === "false"){
    $('.signoff-edit-button').css('display', 'inline-block');
    $signoffButton.css('display', 'inline-block');
}

// Perform signoff 
$signoffButton.click(function(){
    let confirmResponse = confirm('This will permanently lock this item from further editing. Are you sure?');
    if (confirmResponse) {
        $('.hidden-signed-off').val(true);
        // trigger edit form submission ie update
        $editForm.trigger('submit');
    }
});

// add signoff icon to signoff items
$('.signoff-item .signed-off').each(function(){
    if ($(this).text() === "false"){
        $(this).parent().append('<svg class="bi bi-unlock-fill text-warning float-right" width="1.3em" height="1.3em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 10a2 2 0 012-2h7a2 2 0 012 2v5a2 2 0 01-2 2h-7a2 2 0 01-2-2v-5z"></path><path fill-rule="evenodd" d="M10.5 5a3.5 3.5 0 117 0v3h-1V5a2.5 2.5 0 00-5 0v3h-1V5z" clip-rule="evenodd"></path></svg>');
    } else {
        $(this).parent().append('<svg class="bi bi-lock-fill text-dark float-right" width="1.3em" height="1.3em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect width="11" height="9" x="4.5" y="8" rx="2"></rect><path fill-rule="evenodd" d="M6.5 5a3.5 3.5 0 117 0v3h-1V5a2.5 2.5 0 00-5 0v3h-1V5z" clip-rule="evenodd"></path></svg>');
    }    
});

