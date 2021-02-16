const uploadButton = document.querySelector('#upload-button');
const cancelDocumentsButton = document.querySelector('#cancel-documents-button'); 
const deleteDocumentsButton = document.querySelector('#delete-documents-button');
const docDelCheckboxes = document.querySelectorAll('.document-delete-checkbox');
const uploadTools = document.querySelector('#upload-tools');

// (No JQuery) DOCUMENT MANAGEMENT FUNCTIONALITTY
const fileInputControl = document.querySelector('#documents-upload-control'); 
fileInputControl.addEventListener('change', () => {
    if (fileInputControl.files.length) {
        uploadButton.style.display = 'block';
        document.querySelector('#cancel-documents-button').style.display = 'block';
    }

});

// (No JQuery) Uploading Documents Message 
uploadButton.addEventListener('click', () => {
    document.querySelector('#upload-status').textContent = 'Uploading...';
    document.querySelector('#spinner').classList.add("fas", "fa-spinner", "fa-pulse");
});    

// (No JQuery) Cancel button functionality
cancelDocumentsButton.addEventListener('click', () => { 
    // cancel upload functionality
    if (fileInputControl.files.length) {
        cancelDocumentsButton.style.display = 'none';            
        uploadButton.style.display = 'none';
        fileInputControl.value = ""; // resets
    // cancel delete functionality
    } else if (document.querySelectorAll('.document-delete-checkbox:checked').length > 0){    
        deleteDocumentsButton.style.display = 'none';
        cancelDocumentsButton.style.display = 'none';
        document.querySelectorAll('.document-delete-checkbox:checked').forEach(checkBox => {checkBox.checked = false});
        uploadTools.style.display = 'block'; 
    }
});

// (No JQuery) deduce if any checkboxes clicked and activate delete or cancel buttons
docDelCheckboxes.forEach(checkBox => {
    checkBox.addEventListener('click', () => {
        if (document.querySelectorAll('.document-delete-checkbox:checked').length > 0){
            deleteDocumentsButton.style.display = 'block';
            cancelDocumentsButton.style.display = 'block';
            uploadTools.style.display = 'none';
        } else {
            deleteDocumentsButton.style.display = 'none';
            cancelDocumentsButton.style.display = 'none';
            uploadTools.style.display = 'block';    
        }
    });
});

// (No JQuery) Delete multiple documents
document.querySelector('#delete-documents-form').addEventListener('submit', e => {
    e.preventDefault();
    if (confirm('Are you sure?')){    
        const documentArray = document.querySelectorAll('.document-delete-checkbox:checked');
        documentArray.forEach(document => {
            const documentId = document.value;
            const itemToDelete = document.closest('.document-group-item');

            fetch(`/patients/${patientId}/documents/${documentId}/multiple`, {
                method: 'DELETE'
            })
            .then((response) => {
                if (response.ok) {
                    itemToDelete.remove();
                    deleteDocumentsButton.style.display = 'none';
                    cancelDocumentsButton.style.display = 'none';
                    uploadTools.style.display = 'block';
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch(err => {
                // display error in manner consistent with server side error
                const newHeader = document.createElement("h1");
                newHeader.style.cssText = "color:red";
                newHeader.appendChild(document.createTextNode(err));
                const container = document.querySelector('.container');
                document.body.insertBefore(newHeader, container);
            });
        });
    }
});