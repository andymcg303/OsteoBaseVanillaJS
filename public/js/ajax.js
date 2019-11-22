let newPatientButton = $('#new-patient-button');
let newPatientForm = $('#new-patient-form');

newPatientButton.click(function(){
    newPatientForm.toggle();
    $(this).prop('disabled',true);
});


$('#cancel-new-patient').click(function(){
    newPatientButton.prop('disabled',false);
    newPatientForm.toggle();
});

newPatientForm.submit(function(e){
    e.preventDefault();
    let newPatientData = $(this).serialize();
    $.post('/patients', newPatientData, function(data){
        debugger;
        $('patient-list').append(
            `<a class="list-group-item list-group-item-action list-group-item-light" href="/patients/${data._id}">${data.firstname} + " " + ${data.surname}<span class="float-right">${data.dob}</span></a>`
        );    
    });
    newPatientButton.prop('disabled',false);
    newPatientForm.toggle();
});