$(function(){

    $.fn.dataTable.moment( 'DD/MM/YYYY' );

    // Patient Index DataTable initialisation
    const $patientTable = $('#patient-table').DataTable( {
        "columnDefs":  
            [{
                "targets": [ 0 ],
                "visible": false
            }],
            "order": [ 0, 'desc' ],
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

    // // PATIENT INDEX
    const newPatientButton = document.querySelector('#new-patient-button');
    const newPatientForm = document.querySelector('#new-patient-form');

    // Show New Patient form
    newPatientButton.addEventListener('click', function(){
        newPatientForm.style.display = 'block';
        this.style.display = 'none';
    });

    // Hide new patient form
    document.querySelector('#cancel-new-patient').addEventListener('click', () => {
        newPatientForm.style.display = 'none';
        document.querySelectorAll('.form-control').forEach(el => el.value = '');
        newPatientButton.style.display = 'block';
    });

    // // Post new patient
    // $newPatientForm.submit(function(e){
    //     e.preventDefault();
    //     const $newPatientData = $(this).serialize();
    //     $.post('/patients', $newPatientData, function(data){
    //         $patientTable.row.add( [ 
    //             `${data._id}`,
    //             `${data.surname}`,
    //             `${data.firstname}`,
    //             `${moment(data.dob).format('DD/MM/YYYY')}`,
    //             `${data.phonenumber}`] )
    //         .draw();
    //         $newPatientForm.find('.form-control').val('');
    //         $newPatientButton.prop('disabled',false);
    //         $newPatientForm.toggle();
    //         $newPatientButton.toggle();    
    //     });
    // });

});