$(function(){

    // SHOW/EDIT FUNCTIONALITY
    let $editForm = $('.edit-form'),
        $editButton = $('.edit-button'),
        $editFormControls = $('.edit-form .form-control'),
        $submitEditButton = $('.submit-edit-button'),
        $cancelEditButton = $('.cancel-edit-button'),
        $deleteButton = $('.delete-button'),
        $deleteForm = $('.delete-form'),
        $signoffButton = $('.signoff-button'),
        $viewDocumentsButton = $('#view-documents-button');

    // Enable Edit form and buttons
    $editButton.click(function(){
        $(this).toggle();
        $viewDocumentsButton.toggle();
        $submitEditButton.toggle();
        $signoffButton.toggle();
        $cancelEditButton.css('display', 'inline-block');
        $deleteButton.css('display', 'inline-block');
        $editFormControls.prop('disabled',false);
    });

    function disableEditForm(){
        $editButton.toggle();
        $viewDocumentsButton.toggle();
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
    
        // Make default values the updated values
        $editFormControls.each(function(){
            $(this).prop('defaultValue', $(this).val());
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

    // Deleting patients prompt, different text
       $('#delete-patient-form').submit(function(e){
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
            // trigger edit form submission ie update with signed off value
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
    
});
