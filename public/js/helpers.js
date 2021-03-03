// DYNAMIC PAGINATION STYLING

// Observe when pagination list changes to re-style
const observer = new MutationObserver(() => {
    stylePagination()
});
const pageList = document.querySelector('.pagination');
observer.observe(pageList, {subtree: true, attributes: true});

// pagination list styling with bootstrap helper function
const stylePagination = () => {
    // add required bootstrap classes
    const pageListItem = document.querySelectorAll('.pagination li');
    pageListItem.forEach(el => {
        el.classList.add('page-item')
        el.querySelector('a').classList.add('page-link');
    });
    // prevent infinite loop
    observer.disconnect();
}

// reconnect observation of pagination list changes on selecting new page
pageList.addEventListener('click', () => {
    observer.observe(pageList, {subtree: true, attributes: true});
});

// Style pagination after DOMLoad, sort and search
window.addEventListener('DOMContentLoaded', () => stylePagination());
patientTableList.on('searchComplete', () => stylePagination())
patientTableList.on('sortComplete', () => stylePagination());