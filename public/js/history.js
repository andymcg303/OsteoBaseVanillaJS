const urlParams = new URLSearchParams(window.location.search);
const showHistory = urlParams.get('showHistory');
// list.js configuration for history scroll
const options = {
    valueNames: [
        'type',
        {name: 'date-created', attr: 'timestamp'},
        'data'
    ]
};

if (showHistory === 'true') {

    let historyList = new List('history-scroll-id', options);

    // sort form newest patient in descending order
    historyList.sort('date-created', { order: 'desc'});

    //History Display Functionality ie formatting with bootstrap
    const mainContainer = document.querySelector('.main-container');
        
    mainContainer.classList.toggle('container');
    mainContainer.classList.toggle('container-fluid');

    const inputsCol = document.querySelector('.inputs-col');
    inputsCol.classList.toggle('col-12');
    inputsCol.classList.toggle('col-lg-8');

    //Reformat main container if window width reduced by user and history view selected
    window.addEventListener('resize', () => {
        if (window.innerWidth < 992) { // smaller than BS xl? window size
            mainContainer.classList.remove('container-fluid');
            mainContainer.classList.add('container');
        } else if (window.innerWidth >= 992) { //greater or equal to BS xl? window size
            mainContainer.classList.remove('container');
            mainContainer.classList.add('container-fluid');
        }
    });

};
