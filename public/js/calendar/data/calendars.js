const CalendarList = [];

function CalendarInfo() {
    this.id = null;
    this.name = null;
    this.checked = true;
    this.color = null;
    this.bgColor = null;
    this.borderColor = null;
    this.dragBgColor = null;
}

function addCalendar(calendar) {
    CalendarList.push(calendar);
}

function findCalendar(id) {
    let found;

    CalendarList.forEach(function(calendar) {
        if (calendar.id === id) {
            found = calendar;
        }
    });

    return found || CalendarList[0];
}

fetch(`/calendar/calendarlist`, {
    // headers: { "X-Requested-With": "XMLHttpRequest" },
    method: 'GET'
}).then(response => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response);
}).then((data) => {
    let calendar;
    data.forEach(user => {
        if (user.user_type !== 'Reception') {
            calendar = new CalendarInfo();
            calendar.id = user._id;
            calendar.name = user.username;
            calendar.color = '#FFF';
            calendar.bgColor = user.calendar_color;
            calendar.dragBgColor = user.calendar_color;
            calendar.borderColor = user.calendar_color;
            addCalendar(calendar);
        }
    });

    const calendarList = document.getElementById('calendarList');
    const html = [];
    CalendarList.forEach(function(calendar) {
        html.push('<div class="lnb-calendars-item"><label>' +
            '<input type="checkbox" class="tui-full-calendar-checkbox-round" value="' + calendar.id + '" checked>' +
            '<span style="border-color: ' + calendar.borderColor + '; background-color: ' + calendar.borderColor + ';"></span>' +
            '<span>' + calendar.name + '</span>' +
            '</label></div>'
        );
    });
    calendarList.innerHTML = html.join('\n');
});
