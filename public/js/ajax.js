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
    $deleteForm = $('.delete-form');

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
    e.preventDefault();
    var confirmResponse = confirm('Are you sure?');
    if (confirmResponse) {
        var actionUrl = $(this).attr('action');
        $.ajax({
            url: actionUrl,
            type: 'DELETE',
            complete: function(data){
                window.location.assign('/patients/' + data.responseJSON)
            }
        });
    }
});

$('#search').submit(function(e){
    debugger;
	e.preventDefault();
	$.get('/patients?keyword=' + encodeURIComponent($('#search-text').val()), function (data) {
		// $('#patient-list').html('');
		data.forEach(function (patient) {
            alert("found a match");
			// $('#todo-list').append('\n\t\t\t\t<li class="list-group-item">\n\t\t\t\t\t<form action="/todos/' + todo._id + '" method="POST" class="edit-item-form">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<label for="' + todo._id + '">Item Text</label>\n\t\t\t\t\t\t\t<input type="text" value="' + todo.text + '" name="todo[text]" class="form-control" id="' + todo._id + '">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class="btn btn-primary">Update Item</button>\n\t\t\t\t\t</form>\n\t\t\t\t\t<span class="lead">\n\t\t\t\t\t\t' + todo.text + '\n\t\t\t\t\t</span>\n\t\t\t\t\t<div class="pull-right">\n\t\t\t\t\t\t<button class="btn btn-sm btn-warning edit-button">Edit</button>\n\t\t\t\t\t\t<form style="display: inline" method="POST" action="/todos/' + todo._id + '" class="delete-item-form">\n\t\t\t\t\t\t\t<button type="submit" class="btn btn-sm btn-danger">Delete</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="clearfix"></div>\n\t\t\t\t</li>\n\t\t\t\t');
		});
	});
});

