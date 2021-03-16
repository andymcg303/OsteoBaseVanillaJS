const uploadButton = document.querySelector('#upload-button');
const printDocumentsButton = document.querySelector('#print-documents-button');
const cancelDocumentsButton = document.querySelector('#cancel-documents-button'); 
const deleteDocumentsButton = document.querySelector('#delete-documents-button');
const docDelCheckboxes = document.querySelectorAll('.document-delete-checkbox');
const uploadTools = document.querySelector('#upload-tools');
const selectTools = document.querySelectorAll('.select-tools');

// DOCUMENT MANAGEMENT FUNCTIONALITTY
const fileInputControl = document.querySelector('#documents-upload-control'); 
fileInputControl.addEventListener('change', () => {
    if (fileInputControl.files.length) {
        uploadButton.style.display = 'block';
        document.querySelector('#cancel-documents-button').style.display = 'block';
        selectTools.forEach(tool => {tool.style.display = 'none'});
    }

});

// Uploading Documents Message 
uploadButton.addEventListener('click', () => {
    document.querySelector('#upload-status').textContent = 'Uploading...';
    document.querySelector('#spinner').classList.add("fas", "fa-spinner", "fa-pulse");
});    

// Cancel button functionality
cancelDocumentsButton.addEventListener('click', () => { 
    // cancel upload functionality
    if (fileInputControl.files.length) {
        cancelDocumentsButton.style.display = 'none';            
        uploadButton.style.display = 'none';
        selectTools.forEach(tool => {tool.style.display = 'block'});
        fileInputControl.value = ""; // resets
    // cancel delete functionality
    } else if (document.querySelectorAll('.document-delete-checkbox:checked').length > 0){    
        printDocumentsButton.style.display = "none";
        deleteDocumentsButton.style.display = 'none';
        cancelDocumentsButton.style.display = 'none';
        document.querySelectorAll('.document-delete-checkbox:checked').forEach(checkBox => {checkBox.checked = false});
        uploadTools.style.display = 'block'; 
    }
});

// deduce if any checkboxes clicked and activate print, delete and cancel buttons
docDelCheckboxes.forEach(checkBox => {
    checkBox.addEventListener('click', () => {
        if (document.querySelectorAll('.document-delete-checkbox:checked').length > 0){
            printDocumentsButton.style.display = "block";
            deleteDocumentsButton.style.display = 'block';
            cancelDocumentsButton.style.display = 'block';
            uploadTools.style.display = 'none';
        } else {
            printDocumentsButton.style.display = "none";
            deleteDocumentsButton.style.display = 'none';
            cancelDocumentsButton.style.display = 'none';
            uploadTools.style.display = 'block';    
        }
    });
});

// Print multiple documents
printDocumentsButton.addEventListener('click', () => { 
    const checkedArray = document.querySelectorAll('.document-delete-checkbox:checked');
    const urlArray = [];
    checkedArray.forEach(el => {
        // up the dom tree, back down to image, the get the src attribute
        const url = el.closest('.document-group-item').querySelector('.img-thumbnail').getAttribute('src');
        urlArray.push(url);
    })
    printJS(urlArray, 'image');
});

// Delete multiple documents
document.querySelector('#delete-documents-form').addEventListener('submit', e => {
    e.preventDefault();
    if (confirm('Are you sure?')){    
        const docArray = document.querySelectorAll('.document-delete-checkbox:checked');
        docArray.forEach(doc => {
            const docId = doc.value;
            const itemToDelete = doc.closest('.document-group-item');

            fetch(`/patients/${patientId}/documents/${docId}/multiple`, {
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