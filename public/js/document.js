$(function(){
   
    // DOCUMENT MANAGEMENT FUNCTIONALITTY
    let fileInputControl = document.querySelector('#documents-upload-control'); 
    fileInputControl.addEventListener('change', (e) => {
        if (fileInputControl.files.length) {
            $('#upload-button').show();
            $('#cancel-documents-button').show();
        } else {
            $('#upload-button').hide();
            $('#cancel-documents-button').hide();
        }

    });

    // Uploading Documents Message 
    $('#upload-button').click(function(){
        $('#upload-status').text('Uploading...');
        $('#spinner').addClass("fas fa-spinner fa-pulse");
        console.log('spin!');
    });    
 

    $('#cancel-documents-button').click(function(){
        // cancel upload functionality
        if (fileInputControl.files.length) {
            $('#cancel-documents-button').hide();            
            $('#upload-button').hide();
            fileInputControl.value = ""; // resets
        // cancel delete functionality
        } else if ($('.document-delete-checkbox:checked').length > 0){
            $('#delete-documents-button').hide();
            $('#cancel-documents-button').hide();
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
            let $documentArray = $('.document-delete-checkbox:checked');
            $documentArray.each(function(){
                let $documentId = $(this).val();
                let $itemToDelete = $(this).closest('.document-group-item');
                $.ajax({
                    url: `/patients/${$patientId}/documents/${$documentId}`,
                    type: 'DELETE',
                    itemToDelete: $itemToDelete,
                    success: function() {
                        this.itemToDelete.remove();
                        $('#delete-documents-button').hide();
                        $('#cancel-documents-button').hide();
                        $('.upload-tools').show();    
                    }
                });
            });
        }
    });
});