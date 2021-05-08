// SHOW/EDIT FUNCTIONALITY
const editForm = document.querySelector('.edit-form');
const editButton = document.querySelector('.edit-button');
const editFormControls = document.querySelectorAll('.edit-form .form-control');
const submitEditButton = document.querySelector('.submit-edit-button');
const cancelEditButton = document.querySelector('.cancel-edit-button');
const deleteButton = document.querySelector('.delete-button');
const viewDocumentsButton = document.querySelector('#view-documents-button');
const changeViewButton = document.querySelector('.change-view-button');

// Enable Edit form and buttons
editButton.addEventListener('click', function(){
    this.style.display = 'none';
    viewDocumentsButton.style.display = 'none';
    submitEditButton.style.display = 'block';
    cancelEditButton.style.display = 'inline-block';
    deleteButton.style.display = 'inline-block';
    editFormControls.forEach(control => {control.disabled = false});
    changeViewButton.style.display = 'none';
});

function disableEditForm(){
    editButton.style.display = 'inline-block';
    viewDocumentsButton.style.display = 'inline-block';
    submitEditButton.style.display = 'none';
    cancelEditButton.style.display = 'none';
    deleteButton.style.display = 'none';
    editFormControls.forEach(control => {control.disabled = true});
    changeViewButton.style.display = 'block';
}

// Disable Edit functionaity
cancelEditButton.addEventListener('click', function(){    
    editFormControls.forEach(control => {
        control.value = control.defaultValue;
    }); 
    disableEditForm();
});

// Submit Edit Details
editForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patientData = Object.fromEntries(formData.entries());
    const formAction = e.target.getAttribute('action');
    fetch(formAction, {
        headers: { "Content-Type": "application/json" },
        method: 'PUT',
        body: JSON.stringify(patientData)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(() => {
        // Make default values the updated values
        editFormControls.forEach(control => {
            control.defaultValue = control.value;
        }); 
        disableEditForm();         
    });
}); 

// Deleting patients prompt, different text to common delete
document.querySelector('#delete-patient-form').addEventListener('submit', e => {
    const confirmResponse = confirm('This will delete all the patients details including clinical details which by law you are required to keep for 6 years. Are you sure?');
    if (!confirmResponse) {
        e.preventDefault();
    }
});