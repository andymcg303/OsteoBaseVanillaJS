$(function(){

    $.fn.dataTable.moment( 'DD/MM/YYYY' );

    // Patient Index DataTable initialisation
    let $patientTable = $('#patient-table').DataTable( {
        "columnDefs":  
            [{
                "targets": [ 0 ],
                "visible": false
            }],
            "lengthMenu": [[10, 20, -1], [10, 20, "All"]]
        } );

    // Prevents flicker on loading
    $('#patient-table').show();    

    // open patient view
    $('#patient-table tbody').on('click', 'tr', function () {
        const data = $patientTable.row( this ).data();
        const urlParams = new URLSearchParams(window.location.search);
        const currentView = urlParams.get('currentView');
        window.location.assign(`patients/${data[0]}?currentView=${currentView}`);
    });

    // PATIENT INDEX
    let $newPatientButton = $('#new-patient-button'),
        $newPatientForm = $('#new-patient-form');

    // Show New Patient form
    $newPatientButton.click(function(){
        $newPatientForm.toggle();
        // $(this).prop('disabled',true);
        $(this).toggle();
    });

    // Hide new patient form
    $('#cancel-new-patient').click(function(){
        $newPatientForm.toggle();
        $newPatientForm.find('.form-control').val('');
        $newPatientButton.toggle();
    });

    // Post new patient
    $newPatientForm.submit(function(e){
        e.preventDefault();
        let $newPatientData = $(this).serialize();
        $.post('/patients', $newPatientData, function(data){
            $patientTable.row.add( [ 
                `${data._id}`,
                `${data.surname}`,
                `${data.firstname}`,
                `${moment(data.dob).format('DD/MM/YYYY')}`,
                `${data.phonenumber}`] )
            .draw();
            $newPatientForm.find('.form-control').val('');
            $newPatientButton.prop('disabled',false);
            $newPatientForm.toggle();
            $newPatientButton.toggle();    
        });
    });

    // // Sorting functionality
    // $('#sort-name-button').click(function(){
    //     tinysort($('.list-group-item'), {selector: '.patient-name'});
    // });
    
    // $('#sort-dob-button').click(function(){
    //     tinysort($('.list-group-item'), {selector: '.patient-dob'});
    // });

});