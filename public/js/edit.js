// $(function(){

//     $.fn.dataTable.moment( 'DD/MM/YYYY HH:mm' );

//     // Patient Index DataTable initialisation
//     const $patientLogTable = $('#patient-log-table').DataTable( {
//         "columnDefs":  
//             [{
//                 "targets": [ 0, 1 ],
//                 "visible": false
//             }],
//         "order": [[ 2, "desc" ]], // in production will be better to default sorting to ID ie: [0], as date in seed data not accurate
//         "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]]
//     } );

//     // Prevents flicker on loading
//     $('#patient-log-table').show();    

//     $('#patient-log-table tbody').on('click', 'tr', function () {
//         // Block access to patient records for reception user type
//         if (`${$userType}` !== "Reception") {
//             const data = $patientLogTable.row( this ).data();

//             switch (data[1]){
//                 case "M":
//                     window.location.assign(`${$patientId}/medhists/${data[0]}?currentView=log`);
//                     break;
//                 case "I":
//                     window.location.assign(`${$patientId}/interviews/${data[0]}?currentView=log`);
//                     break;
//                 case "C":
//                     window.location.assign(`${$patientId}/clinicals/${data[0]}?currentView=log`);
//                     break;    
//             }
//         }
//     });

//     // SHOW/EDIT FUNCTIONALITY
//     const $editForm = $('.edit-form'),
//         $editButton = $('.edit-button'),
//         $editFormControls = $('.edit-form .form-control'),
//         $submitEditButton = $('.submit-edit-button'),
//         $cancelEditButton = $('.cancel-edit-button'),
//         $deleteButton = $('.delete-button'),
//         $signoffButton = $('.signoff-button'),
//         $viewDocumentsButton = $('#view-documents-button'),
//         $changeViewButton = $('.change-view-button');

//     // Enable Edit form and buttons
//     $editButton.click(function(){
//         $(this).toggle();
//         $viewDocumentsButton.toggle();
//         $submitEditButton.toggle();
//         $signoffButton.toggle();
//         $cancelEditButton.css('display', 'inline-block');
//         $deleteButton.css('display', 'inline-block');
//         $editFormControls.prop('disabled',false);
//         $changeViewButton.toggle();
//     });

//     function disableEditForm(){
//         $editButton.toggle();
//         $viewDocumentsButton.toggle();
//         $signoffButton.toggle();
//         $submitEditButton.hide();
//         $cancelEditButton.hide();
//         $deleteButton.hide();
//         $editFormControls.prop('disabled',true);
//         $changeViewButton.toggle();
//     }

//     // Disable Edit functionaity
//     $cancelEditButton.click(function(){
//         $editFormControls.each(function(){
//             $(this).val($(this).prop('defaultValue'));
//         }); 
//         disableEditForm();
//     });

//     // Submit Edit Details
//     $editForm.submit(function(e){
//         e.preventDefault();
//         const $data = $(this).serialize();
//         const $formAction = $(this).attr('action');
//         $.ajax({
//             url: $formAction,
//             data: $data,
//             method: 'PUT',
//         });
    
//         // Make default values the updated values
//         $editFormControls.each(function(){
//             $(this).prop('defaultValue', $(this).val());
//         }); 
//         disableEditForm();    
//     });

//     // Delete Prompt 
//     $('.delete-form').submit(function(e){
//         const confirmResponse = confirm('Are you sure?');
//         if (!confirmResponse) {
//             e.preventDefault();
//         }
//     });

//     // Deleting patients prompt, different text
//        $('#delete-patient-form').submit(function(e){
//         const confirmResponse = confirm('This will delete all the patients details including clinical details which by law you are required to keep for 6 years. Are you sure?');
//         if (!confirmResponse) {
//             e.preventDefault();
//         }
//     });

//     // SIGNOFF FUNCTIONALITY
//     // Show Edit button and Signoff button if not signed off
//     if ($('.edit-form .hidden-signed-off').val() === "false"){
//         $('.signoff-edit-button').css('display', 'inline-block');
//         $signoffButton.css('display', 'inline-block');
//     }

//     // Perform signoff 
//     $signoffButton.click(function(){
//         const confirmResponse = confirm('This will permanently lock this item from further editing. Are you sure?');
//         if (confirmResponse) {
//             $('.hidden-signed-off').val(true);
//             // trigger edit form submission ie update with signed off value
//             $editForm.trigger('submit');
//         }
//     });

//     //TOGGLE HISTORY DISPLAY FUNCTIONALITY
//     const $historyButton = $('.history-button');

//     $historyButton.click(function(){
//         $('.main-container').toggleClass('container').toggleClass('container-fluid');
//         $('.history-scroll').toggle();
//         $('.inputs-col').toggleClass('col-12').toggleClass('col-lg-8');
//         $(this).text(function(i, text){
//             return text === "Show History" ? "Hide History" : "Show History";
//         });
//     })

//     //Reformat main container if window width reduced by user and history view selected
//     $(window).resize(function() {
//         if ($(window).width() < 992 && $historyButton.text() === "Hide History") { // smaller than BS xl? window size
//             $('.main-container').removeClass('container-fluid');
//             $('.main-container').addClass('container');
//         } else if ($(window).width() >= 992 && $historyButton.text() === "Hide History") { //greater or equal to BS xl? window size 
//             $('.main-container').removeClass('container');
//             $('.main-container').addClass('container-fluid');
//         }
//     });

//     // $( "#history-scroll-id" ).resizable();

// });

// SHOW/EDIT FUNCTIONALITY
const $editForm = document.querySelector('.edit-form');
const $editButton = document.querySelector('.edit-button');
const $editFormControls = document.querySelectorAll('.edit-form .form-control');
const $submitEditButton = document.querySelector('.submit-edit-button');
const $cancelEditButton = document.querySelector('.cancel-edit-button');
const $deleteButton = document.querySelector('.delete-button');
const $signoffButton = document.querySelector('.signoff-button');

// Enable Edit form and buttons
$editButton.addEventListener('click', function(){
    this.style.display = 'none';
    $submitEditButton.style.display = 'inline-block';
    $signoffButton.style.display = 'none';
    $cancelEditButton.style.display = 'inline-block';
    $deleteButton.style.display = 'inline-block';
    $editFormControls.forEach(control => control.disabled = false);
});

// function disableEditForm(){
//     $editButton.toggle();
//     $viewDocumentsButton.toggle();
//     $signoffButton.toggle();
//     $submitEditButton.hide();
//     $cancelEditButton.hide();
//     $deleteButton.hide();
//     $editFormControls.prop('disabled',true);
//     $changeViewButton.toggle();
// }

function disableEditForm(){
    $editButton.style.display = 'inline-block';
    $signoffButton.style.display = 'inline-block';
    $submitEditButton.style.display = 'none';
    $cancelEditButton.style.display = 'none';
    $deleteButton.style.display = 'inline-block';
    // $editFormControls.prop('disabled',true);
}

// // Disable Edit functionaity
// $cancelEditButton.click(function(){
//     $editFormControls.each(function(){
//         $(this).val($(this).prop('defaultValue'));
//     }); 
//     disableEditForm();
// });

// // Submit Edit Details
// $editForm.submit(function(e){
//     e.preventDefault();
//     const $data = $(this).serialize();
//     const $formAction = $(this).attr('action');
//     $.ajax({
//         url: $formAction,
//         data: $data,
//         method: 'PUT',
//     });

//     // Make default values the updated values
//     $editFormControls.each(function(){
//         $(this).prop('defaultValue', $(this).val());
//     }); 
//     disableEditForm();    
// });

// // Delete Prompt 
// $('.delete-form').submit(function(e){
//     const confirmResponse = confirm('Are you sure?');
//     if (!confirmResponse) {
//         e.preventDefault();
//     }
// });

// // Deleting patients prompt, different text
//     $('#delete-patient-form').submit(function(e){
//     const confirmResponse = confirm('This will delete all the patients details including clinical details which by law you are required to keep for 6 years. Are you sure?');
//     if (!confirmResponse) {
//         e.preventDefault();
//     }
// });

// SIGNOFF FUNCTIONALITY
// Show Edit button and Signoff button if not signed off
const signedOff = document.querySelector('.edit-form .hidden-signed-off').value;
if (signedOff === "false") {
    document.querySelector('.signoff-edit-button').style.display = 'inline-block';
    $signoffButton.style.display = 'inline-block';
}

// // Perform signoff 
// $signoffButton.click(function(){
//     const confirmResponse = confirm('This will permanently lock this item from further editing. Are you sure?');
//     if (confirmResponse) {
//         $('.hidden-signed-off').val(true);
//         // trigger edit form submission ie update with signed off value
//         $editForm.trigger('submit');
//     }
// });

// //TOGGLE HISTORY DISPLAY FUNCTIONALITY
// const $historyButton = $('.history-button');

// $historyButton.click(function(){
//     $('.main-container').toggleClass('container').toggleClass('container-fluid');
//     $('.history-scroll').toggle();
//     $('.inputs-col').toggleClass('col-12').toggleClass('col-lg-8');
//     $(this).text(function(i, text){
//         return text === "Show History" ? "Hide History" : "Show History";
//     });
// })

// //Reformat main container if window width reduced by user and history view selected
// $(window).resize(function() {
//     if ($(window).width() < 992 && $historyButton.text() === "Hide History") { // smaller than BS xl? window size
//         $('.main-container').removeClass('container-fluid');
//         $('.main-container').addClass('container');
//     } else if ($(window).width() >= 992 && $historyButton.text() === "Hide History") { //greater or equal to BS xl? window size 
//         $('.main-container').removeClass('container');
//         $('.main-container').addClass('container-fluid');
//     }
// });
