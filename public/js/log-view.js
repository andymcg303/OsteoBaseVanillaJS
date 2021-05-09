const options = {
    valueNames: ['id', 
                'typecode', 
                {name: 'date_created', attr: 'timestamp'},
                'type', 
                'info', 
                'signed_off'],
    page: 5,
    pagination: [{
        outerWindow: 1
    }]
}

const patientLogTableRows = document.querySelectorAll('#patient-log-table tbody tr');

const patientLogTableList = new List('patient-log', options);

patientLogTableList.sort('date_created', { order: 'desc' });

patientLogTableRows.forEach(row => {
    row.addEventListener('click', function() {
        // Block access to patient records for reception user type
        if (`${userTypePass}` !== "Reception") {
            const id = this.querySelector('.id').textContent;
            const typeCode = this.querySelector('.typecode').textContent;
            const urlParams = new URLSearchParams(window.location.search);
            const showHistory = urlParams.get('showHistory');

            switch (typeCode){
                case "M":
                    window.location.assign(`${patientId}/medhists/${id}?currentView=log&showHistory=${showHistory}`);
                    break;
                case "I":
                    window.location.assign(`${patientId}/interviews/${id}?currentView=log&showHistory=${showHistory}`);
                    break;
                case "C":
                    window.location.assign(`${patientId}/clinicals/${id}?currentView=log&showHistory=${showHistory}`);
                    break;    
            }       
        }
    });
});

// Style pagination after DOMLoad, sort and search
window.addEventListener('DOMContentLoaded', () => stylePagination());
patientLogTableList.on('searchComplete', () => stylePagination())
patientLogTableList.on('sortComplete', () => stylePagination());