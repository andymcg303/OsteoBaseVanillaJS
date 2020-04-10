$(function(){

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
            $('#patient-list').append(
                `<a class="list-group-item list-group-item-action list-group-item-light" href="/patients/${data._id}">${data.firstname} ${data.surname}<span class="float-right">${moment(data.dob).format('DD/MM/YYYY')}</span></a>`
            );
            $newPatientForm.find('.form-control').val('');
            $newPatientButton.prop('disabled',false);
            $newPatientForm.toggle();
            $newPatientButton.toggle();    
        });
    });

    // Search on patients surname functionality
    $('#search').submit(function(e){
        e.preventDefault();
        $.get('/patients?keyword=' + encodeURIComponent($('#search-text').val()), function (data) {
            $('#patient-list').html('');
            data.forEach(function (patient) {
                $('#patient-list').append(
                    `<a class="list-group-item list-group-item-action list-group-item-light" href="/patients/${patient._id}">${patient.firstname} ${patient.surname}<span class="float-right">${moment(patient.dob).format('DD/MM/YYYY')}</span></a>`
                );
            });    
        });
    });

    // Sorting functionality
    $('#sort-name-button').click(function(){
        tinysort($('.list-group-item'), {selector: '.patient-name'});
    });
    
    $('#sort-dob-button').click(function(){
        tinysort($('.list-group-item'), {selector: '.patient-dob'});
    });

});