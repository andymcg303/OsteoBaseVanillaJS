$(function(){

    $.fn.dataTable.moment( 'DD/MM/YYYY HH:mm' );

    // Patient Index DataTable initialisation
    let $patientLogTable = $('#patient-log-table').DataTable( {
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

    // open entry type view
    $('#patient-log-table tbody').on('click', 'tr', function () {
        let data = $patientLogTable.row( this ).data();

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

    });

    // SHOW/EDIT FUNCTIONALITY
    let $editForm = $('.edit-form'),
        $editButton = $('.edit-button'),
        $editFormControls = $('.edit-form .form-control'),
        $submitEditButton = $('.submit-edit-button'),
        $cancelEditButton = $('.cancel-edit-button'),
        $deleteButton = $('.delete-button'),
        $signoffButton = $('.signoff-button'),
        $viewDocumentsButton = $('#view-documents-button'),
        $changeViewButton = $('.change-view-button');

    // Enable Edit form and buttons
    $editButton.click(function(){
        $(this).toggle();
        $viewDocumentsButton.toggle();
        $submitEditButton.toggle();
        $signoffButton.toggle();
        $cancelEditButton.css('display', 'inline-block');
        $deleteButton.css('display', 'inline-block');
        $editFormControls.prop('disabled',false);
        $changeViewButton.toggle();
    });

    function disableEditForm(){
        $editButton.toggle();
        $viewDocumentsButton.toggle();
        $signoffButton.toggle();
        $submitEditButton.hide();
        $cancelEditButton.hide();
        $deleteButton.hide();
        $editFormControls.prop('disabled',true);
        $changeViewButton.toggle();
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

    // Delete Prompt 
    $('.delete-form').submit(function(e){
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

});