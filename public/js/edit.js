// // list.js configuration for history scroll
// const options = {
//     valueNames: [
//         'type',
//         {name: 'date-created', attr: 'timestamp'},
//         'data'
//     ]
// };
  
// let historyList = new List('history-scroll-id', options);

// // sort form newest patient in descending order
// historyList.sort('date-created', { order: 'desc'});

// SHOW/EDIT FUNCTIONALITY
const editForm = document.querySelector('.edit-form');
const editButton = document.querySelector('.edit-button');
const editFormControls = document.querySelectorAll('.edit-form .form-control');
const submitEditButton = document.querySelector('.submit-edit-button');
const cancelEditButton = document.querySelector('.cancel-edit-button');
const deleteButton = document.querySelector('.delete-button');
const signoffButton = document.querySelector('.signoff-button');

// Enable Edit form and buttons
editButton.addEventListener('click', function(){
    this.style.display = 'none';
    submitEditButton.style.display = 'inline-block';
    signoffButton.style.display = 'none';
    cancelEditButton.style.display = 'inline-block';
    deleteButton.style.display = 'inline-block';
    editFormControls.forEach(control => control.disabled = false);
});

function disableEditForm(){
    submitEditButton.style.display = 'none';
    cancelEditButton.style.display = 'none';
    deleteButton.style.display = 'none';
    editFormControls.forEach(control => control.disabled = true);
}

// Disable Edit functionaity
cancelEditButton.addEventListener('click', function(){
    editFormControls.forEach(control => {
        control.value = control.defaultValue;
    }); 
    disableEditForm();
    editButton.style.display = 'inline-block';
    signoffButton.style.display = 'inline-block';
});

// Submit Edit Details
editForm.addEventListener('submit', e => {
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
        // get updated patient for history scroll
        return fetch(`/patients/${patientId}`, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
            method: 'GET'});
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(patient => {

        // update history scroll
        const historyTemplate = `
                <% patient.medhists.forEach(medhist => { %>
                    <li>
                        <div class="type"><strong><span class="fas fa-comment-medical text-success"></span> Medical History</strong></div>
                        <div class="date-created" timestamp="<%= Date.parse(medhist.date_created) %>"><strong>Date: </strong><%= moment(medhist.date_created).format('DD/MM/YYYY') %></div>
                        <div class="data">
                            <% if (medhist.critical){ %>
                                <strong>CRITICAL:</strong>        
                                <%= medhist.critical %><br>
                            <% } %>
                            <% if (medhist.meds){ %>
                                <strong>Meds:</strong>   
                                <%= medhist.meds %><br>
                            <% } %>
                            <% if (medhist.ops){ %>
                                <strong>Ops:</strong>        
                                <%= medhist.ops %><br>
                            <% } %>
                            <% if (medhist.fracs){ %>
                                <strong>#:</strong>       
                                <%= medhist.fracs %><br>
                            <% } %>
                            <% if (medhist.accs){ %>
                                <strong>A:</strong>        
                                <%= medhist.accs %><br>
                            <% } %>
                            <% if (medhist.ill){ %>
                                <strong>Ill:</strong>    
                                <%= medhist.ill %><br>
                            <% } %>
                            <% if (medhist.resp){ %>
                                <strong>Resp:</strong>        
                                <%= medhist.resp %><br>
                            <% } %>
                            <% if (medhist.cvs){ %>
                                <strong>CVS:</strong>       
                                <%= medhist.cvs %><br>
                            <% } %>
                            <% if (medhist.gu){ %>
                                <strong>GU:</strong>        
                                <%= medhist.gu %><br>
                            <% } %>
                            <% if (medhist.git){ %>
                                <strong>GIT:</strong>    
                                <%= medhist.git %><br>
                            <% } %>
                            <% if (medhist.gynae){ %>
                                <strong>Gynae:</strong>        
                                <%= medhist.gynae %><br>
                            <% } %>
                            <% if (medhist.msk){ %>
                                <strong>MSk:</strong>       
                                <%= medhist.msk %>
                            <% } %>
                        </div>
                        <hr>
                    </li>
                <% }); %>
                <% patient.interviews.forEach(interview => { %>
                    <li>
                        <div class="type"><strong><span class="fa fa-comments text-info"></span> Consultation</strong></div>
                        <div class="date-created" timestamp="<%= Date.parse(interview.date_created) %>"><strong>Date: </strong><%= moment(interview.date_created).format('DD/MM/YYYY') %><br></div>
                        <div class="data">
                            <% if (interview.CO){ %>
                                <strong>CO:</strong>        
                                <%= interview.CO %><br>
                            <% } %>
                            <% if (interview.onset){ %>
                                <strong>Onset:</strong>   
                                <%= interview.onset %><br>
                            <% } %>
                            <% if (interview.reason){ %>
                                <strong>Reason:</strong>        
                                <%= interview.reason %><br>
                            <% } %>
                            <% if (interview.agg){ %>
                                <strong>Agg:</strong>       
                                <%= interview.agg %><br>
                            <% } %>
                            <% if (interview.rel){ %>
                                <strong>Rel:</strong>        
                                <%= interview.rel %><br>
                            <% } %>
                            <% if (interview.dp){ %>
                                <strong>DP:</strong>    
                                <%= interview.dp %><br>
                            <% } %>
                            <% if (interview.ph){ %>
                                <strong>PH:</strong>        
                                <%= interview.ph %><br>
                            <% } %>
                            <% if (interview.invest){ %>
                                <strong>Invest:</strong>       
                                <%= interview.invest %>
                            <% } %>
                        </div>    
                        <hr>
                    </li>
                <% }); %>
                <% patient.clinicals.forEach(clinical => { %>
                    <li>
                        <div class="type"><strong><span class="fas fa-user-friends text-danger"></span> Clinical Details</strong></div>
                        <div class="date-created" timestamp="<%= Date.parse(clinical.date_created) %>"><strong>Date: </strong><%= moment(clinical.date_created).format('DD/MM/YYYY') %></div>
                        <div class="data">
                            <% if (clinical.problem){ %>
                                <strong>Problem: </strong>    
                                <%= clinical.problem %><br>
                            <% } %>
                            <% if (clinical.OE){ %>
                                <strong>O/E:</strong>        
                                <%= clinical.OE %><br>
                            <% } %>
                            <% if (clinical.diag){ %>
                                <strong>Diag: </strong>       
                                <%= clinical.diag %><br>
                            <% } %>
                            <% if (clinical.TTT){ %>
                                <strong>TTT: </strong>        
                                <%= clinical.TTT %>
                            <% } %>
                        </div>
                        <hr>
                    </li>
                <% }); %>
            `
        const html = ejs.render(historyTemplate, { patient });
        document.querySelector('#history-list').innerHTML = html;

        // sort form newest patient in descending order
        historyList = new List('history-scroll-id', options);
        historyList.sort('date-created', { order: 'desc'});

        // Make default values the updated values
        editFormControls.forEach(control => {
            control.defaultValue = control.value;
        }); 
        disableEditForm();
        // Toggle buttons according to edit or signoff
        if (window.getComputedStyle(signoffButton).display === 'inline-block') {
            editButton.style.display = 'none';
            signoffButton.style.display = 'none';
        } else {
            editButton.style.display = 'inline-block';
            signoffButton.style.display = 'inline-block';
        }
    });
});

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
    signoffButton.style.display = 'inline-block';
}

// Perform signoff 
signoffButton.addEventListener('click', () => {
    const confirmResponse = confirm('This will permanently lock this item from further editing. Are you sure?');
    if (confirmResponse) {
        document.querySelector('.hidden-signed-off').value = "true";
        // trigger edit form submission ie update with signed off value
        editForm.requestSubmit();
    }
});
