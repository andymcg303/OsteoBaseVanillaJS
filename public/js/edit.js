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
    // $editButton.style.display = 'inline-block';
    // $signoffButton.style.display = 'inline-block';
    $submitEditButton.style.display = 'none';
    $cancelEditButton.style.display = 'none';
    $deleteButton.style.display = 'none';
    $editFormControls.forEach(control => control.disabled = true);
}

// // Disable Edit functionaity
// $cancelEditButton.click(function(){
//     $editFormControls.each(function(){
//         $(this).val($(this).prop('defaultValue'));
//     }); 
//     disableEditForm();
// });

// Disable Edit functionaity
$cancelEditButton.addEventListener('click', function(){
    $editFormControls.forEach(control => {
        control.value = control.defaultValue;
    }); 
    disableEditForm();
    $editButton.style.display = 'inline-block';
    $signoffButton.style.display = 'inline-block';
});

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

// Submit Edit Details
$editForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patientData = Object.fromEntries(formData.entries());
    const formAction = e.target.getAttribute('action');
    fetch(formAction, {
        headers: { "Content-Type": "application/json" },
        method: 'PUT',
        body: JSON.stringify(patientData)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(() => {
        // Make default values the updated values
        $editFormControls.forEach(control => {
            control.defaultValue = control.value;
        }); 
        disableEditForm();
        // Toggle buttons according to edit or signoff
        if (window.getComputedStyle($signoffButton).display === 'inline-block') {
            $editButton.style.display = 'none';
            $signoffButton.style.display = 'none';
        } else {
            $editButton.style.display = 'inline-block';
            $signoffButton.style.display = 'inline-block';
        }
    });
});

// // Delete Prompt 
// $('.delete-form').submit(function(e){
//     const confirmResponse = confirm('Are you sure?');
//     if (!confirmResponse) {
//         e.preventDefault();
//     }
// }); 

// Delete Prompt 
const deleteForm = document.querySelector('.delete-form');
deleteForm.addEventListener('submit', e => {
    const confirmResponse = confirm('Are you sure?');
    if (!confirmResponse) {
        e.preventDefault();
    }
});

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

// Perform signoff 
$signoffButton.addEventListener('click', () => {
    const confirmResponse = confirm('This will permanently lock this item from further editing. Are you sure?');
    if (confirmResponse) {
        document.querySelector('.hidden-signed-off').value = "true";
        // trigger edit form submission ie update with signed off value
        $editForm.requestSubmit();
    }
});

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
