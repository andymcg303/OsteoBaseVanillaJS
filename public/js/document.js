$(function(){
   
    const uploadButton = document.querySelector('#upload-button');
    const cancelDocumentsButton = document.querySelector('#cancel-documents-button'); 
    const deleteDocumentsButton = document.querySelector('#delete-documents-button');
    const checkedDocDelCheckboxes = document.querySelectorAll('.document-delete-checkbox:checked');
    const uploadTools = document.querySelectorAll('.upload-tools');

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

    // $('#cancel-documents-button').click(function(){
    //     // cancel upload functionality
    //     if (fileInputControl.files.length) {
    //         $('#cancel-documents-button').hide();            
    //         $('#upload-button').hide();
    //         fileInputControl.value = ""; // resets
    //     // cancel delete functionality
    //     } else if ($('.document-delete-checkbox:checked').length > 0){
    //         $('#delete-documents-button').hide();
    //         $('#cancel-documents-button').hide();
    //         $('.document-delete-checkbox').prop('checked',false);
    //         $('.upload-tools').show(); 
    //     }
    // });

    // (No JQuery) Cancel button functionality
    // $('#cancel-documents-button').click(function(){
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
            $('.document-delete-checkbox').prop('checked',false);
            $('.upload-tools').show(); 
        }
    });

    // deduce if any checkboxes clicked and activate delete or cancel buttons
    $('.document-delete-checkbox').click(function(){
        if ($('.document-delete-checkbox:checked').length > 0){
            $('#delete-documents-button').show();
            $('#cancel-documents-button').show();
            $('.upload-tools').hide();
        } else {
            $('#delete-documents-button').hide();
            $('#cancel-documents-button').hide();
            $('.upload-tools').show();    
        } 
    });

    // Delete multiple documents
    $('#delete-documents-form').submit(function(e){
        e.preventDefault();
        if (confirm('Are you sure?')){    
            const $documentArray = $('.document-delete-checkbox:checked');
            $documentArray.each(function(){
                const $documentId = $(this).val();
                const $itemToDelete = $(this).closest('.document-group-item');

                fetch(`/patients/${$patientId}/documents/${$documentId}/multiple`, {
                    method: 'DELETE'
                })
                .then((response) => {
                    if (response.ok) {
                        $itemToDelete.remove();
                        $('#delete-documents-button').hide();
                        $('#cancel-documents-button').hide();
                        $('.upload-tools').show();
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
});