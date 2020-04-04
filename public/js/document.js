$(function(){
   
   // DOCUMENT MANAGEMENT FUNCTIONALITTY
    $('.upload-edit-button').click(function(){
        $(this).toggle();
        $('.upload-tools').toggle();
        $('.back-to-pt-button').toggle()        
    });

    $('.cancel-upload-button').click(function(){
        $('.upload-tools').toggle();
        $('.upload-edit-button').toggle();
        $('.back-to-pt-button').toggle()
    });
    
    // deduce if any checkboxes clicked and activate delete button on index page
    $('.document-delete-checkbox').click(function(){
        if ($('.document-delete-checkbox:checked').length > 0){
            $('#delete-documents-button').show();
        } else {
            $('#delete-documents-button').hide();    
        } 
    });

    // Delete multiple documents (possibly better to pass an array to controller)
    $('#delete-documents-form').submit(function(e){
        debugger;
        e.preventDefault();
        if (confirm('Are you sure?')){    
            let $documentArray = $('.document-delete-checkbox:checked');
            $documentArray.each(function(){
                let $documentId = $(this).val();
                $.ajax({
                    url: `/patients/${$patientId}/documents/${$documentId}`,
                    type: 'DELETE',
                    complete: function() {
                        debugger;
                        window.location.reload();
                    }
                });
            });
        }
    });
});