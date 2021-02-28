$.fn.dataTable.moment( 'DD/MM/YYYY HH:mm' );

// Patient Index DataTable initialisation
const $patientLogTable = $('#patient-log-table').DataTable( {
    "columnDefs":  
        [{
            "targets": [ 0, 1 ],
            "visible": false
        }],
    "order": [[ 2, "desc" ]], // in production will be better to default sorting to ID ie: [0], as date in seed data not accurate
    "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]]
} );

// Prevents flicker on loading
$('#patient-log-table').show();    

$('#patient-log-table tbody').on('click', 'tr', function () {
    // Block access to patient records for reception user type
    if (`${$userType}` !== "Reception") {
        const data = $patientLogTable.row( this ).data();

        switch (data[1]){
            case "M":
                window.location.assign(`${$patientId}/medhists/${data[0]}?currentView=log`);
                break;
            case "I":
                window.location.assign(`${$patientId}/interviews/${data[0]}?currentView=log`);
                break;
            case "C":
                window.location.assign(`${$patientId}/clinicals/${data[0]}?currentView=log`);
                break;    
        }
    }
});

// SHOW/EDIT FUNCTIONALITY

// const $editForm = document.querySelector('.edit-form');
const $editButton = document.querySelector('.edit-button');
const $editFormControls = document.querySelectorAll('.edit-form .form-control');
const $submitEditButton = document.querySelector('.submit-edit-button');
const $cancelEditButton = document.querySelector('.cancel-edit-button');
const $deleteButton = document.querySelector('.delete-button');
const $viewDocumentsButton = document.querySelector('#view-documents-button');
const $changeViewButton = document.querySelector('.change-view-button');

// *** need to debug and change to no jQuery ***
const $editForm = $('.edit-form');

// Enable Edit form and buttons
$editButton.addEventListener('click', function(){
    this.style.display = 'none';
    $viewDocumentsButton.style.display = 'none';
    $submitEditButton.style.display = 'block';
    $cancelEditButton.style.display = 'inline-block';
    $deleteButton.style.display = 'inline-block';
    $editFormControls.forEach(control => {control.disabled = false});
    $changeViewButton.style.display = 'none';
});

function disableEditForm(){
    $editButton.style.display = 'inline-block';
    $viewDocumentsButton.style.display = 'inline-block';
    $submitEditButton.style.display = 'none';
    $cancelEditButton.style.display = 'none';
    $deleteButton.style.display = 'none';
    $editFormControls.forEach(control => {control.disabled = true});
    $changeViewButton.style.display = 'block';
}

// Disable Edit functionaity
$cancelEditButton.addEventListener('click', function(){    
    $editFormControls.forEach(control => {
        control.value = control.defaultValue;
    }); 
    disableEditForm();
});

// Submit Edit Details
$editForm.submit(function(e){
    e.preventDefault();
    const $data = $(this).serialize();
    const $formAction = $(this).attr('action');
    $.ajax({
        url: $formAction,
        data: $data,
        method: 'PUT',
    });

    // Make default values the updated values
    $editFormControls.each(function(){
        $(this).prop('defaultValue', $(this).val());
    }); 
    disableEditForm();    
});

// Deleting patients prompt, different text to common delete
document.querySelector('#delete-patient-form').addEventListener('submit', e => {
    const confirmResponse = confirm('This will delete all the patients details including clinical details which by law you are required to keep for 6 years. Are you sure?');
    if (!confirmResponse) {
        e.preventDefault();
    }
});