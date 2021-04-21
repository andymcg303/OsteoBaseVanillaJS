// list.js configuration for history scroll
const options = {
    valueNames: [
        'type',
        {name: 'date-created', attr: 'timestamp'},
        'data'
    ]
};
  
let historyList = new List('history-scroll-id', options);

// sort form newest patient in descending order
historyList.sort('date-created', { order: 'desc'});

//TOGGLE HISTORY DISPLAY FUNCTIONALITY
const historyButton = document.querySelector('.history-button');
const mainContainer = document.querySelector('.main-container');

historyButton.addEventListener('click', function(){ 
    mainContainer.classList.toggle('container');
    mainContainer.classList.toggle('container-fluid');

    const url = new URL(window.location);
    const historyScroll = document.querySelectorAll('.history-scroll');
    if (window.getComputedStyle(historyScroll[0]).display === 'none') {
        historyScroll.forEach(el => el.style.display = 'block');
        // update url to reflect history being shown
        url.searchParams.set('historyScroll', 'true');
        window.history.pushState({}, '', url);
        // update the action attribute of the form to reflect history being shown
        const action = document.querySelector('#new-medhist-form').getAttribute('action');
        // IN THIS SPACE split the string and re-add the historyScroll as true

    } else {
        historyScroll.forEach(el => el.style.display = 'none');
        // update url to reflect history not being shown
        url.searchParams.set('historyScroll', 'false');
        window.history.pushState({}, '', url);
        // update the action attribute of the form to reflect history being shown
        const action = document.querySelector('#new-medhist-form').getAttribute('action');
        // IN THIS SPACE split the string and re-add the historyScroll as true
    }

    const inputsCol = document.querySelector('.inputs-col');
    inputsCol.classList.toggle('col-12');
    inputsCol.classList.toggle('col-lg-8');

    this.textContent = this.textContent === "Show History" ? "Hide History" : "Show History";
    
});

//Reformat main container if window width reduced by user and history view selected
window.addEventListener('resize', () => {
    const mainContainer = document.querySelector('.main-container');
    if (window.innerWidth < 992 && historyButton.textContent === "Hide History") { // smaller than BS xl? window size
        mainContainer.classList.remove('container-fluid');
        mainContainer.classList.add('container');
    } else if (window.innerWidth >= 992 && historyButton.textContent === "Hide History") { //greater or equal to BS xl? window size
        mainContainer.classList.remove('container');
        mainContainer.classList.add('container-fluid');
    }
});