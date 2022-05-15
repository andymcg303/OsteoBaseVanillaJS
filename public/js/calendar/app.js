'use strict';

/* eslint-disable */
/* eslint-env jquery */
/* global moment, tui, chance */
/* global findCalendar, CalendarList, ScheduleList, generateSchedule */

{
    const Calendar = tui.Calendar;
    let resizeThrottled;
    const useCreationPopup = false;
    const useDetailPopup = false;
    // let selectedCalendar; // don't need

    const guideElement = [];

    const cal = new Calendar('#calendar', {
        defaultView: 'week',
        taskView: ['task'],
        scheduleView: ['time'],
        useCreationPopup: useCreationPopup,
        useDetailPopup: useDetailPopup,
        calendars: CalendarList,
        week: {
            startDayOfWeek: 1,
            hourStart: 7,
            hourEnd: 20
        },
        month: {
            startDayOfWeek: 1
        }
        // template: {
        //     // milestone: function(model) {
        //     //     return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + model.bgColor + '">' + model.title + '</span>';
        //     // },
        //     // allday: function(schedule) {
        //     //     return getTimeTemplate(schedule, true);
        //     // },
        //     // taskTitle: function() {
        //     //     return '<span class="tui-full-calendar-left-content">Notes</span>';
        //     // },
        //     // time: function(schedule) {
        //     //     return getTimeTemplate(schedule, false);
        //     // }
        // }
    });

    // event handlers
    cal.on({
        'clickMore': function(e) {
            console.log('clickMore', e);
        },
        'clickSchedule': function(e) {

            //populate edit modal form
            document.querySelector('#appointment-modal-title').textContent = "Edit Appointment";
            document.querySelector('#practitioner').value = e.schedule.calendarId;
            $('#patient').data('selectize').setValue(e.schedule.attendees[0]); //got to use $ for selectize
            document.querySelector('#type').value = e.schedule.raw; 
            document.querySelector('#apptdate').value = `${moment(e.schedule.start.toDate()).format('YYYY-MM-DD')}`;
            document.querySelector('#starttime').value = `${moment(e.schedule.start.getTime()).format('HH:mm')}`; 
            document.querySelector('#endtime').value = `${moment(e.schedule.end.getTime()).format('HH:mm')}`;
            // hidden fields for appointment id and existing calendar id
            document.querySelector('#appointment-id').value = e.schedule.id;
            document.querySelector('#calendar-id').value = e.schedule.calendarId;
            // href for view patients button
            document.querySelector('#view-patient-button').href = `/patients/${e.schedule.attendees[0]}?currentView=${currentView}&showHistory=${showHistory}`;

            document.querySelector('#view-patient-button').style.display = 'inline-block';
            document.querySelector('.delete-button').style.display = 'inline-block';

            // no choice but to use JQuery, need it for TUI anyway
            $('#appointment-modal').modal();

        },
        'clickDayname': function(date) {
            console.log('clickDayname', date);
        },
        'beforeCreateSchedule': function(e) {

            //populate create modal form
            document.querySelector('#appointment-modal-title').textContent = "Create Appointment";
            $('#patient').data('selectize').setValue(null); //got to use $ for selectize
            document.querySelector('#apptdate').value = `${moment(e.start.toDate()).format('YYYY-MM-DD')}`;
            document.querySelector('#starttime').value = `${moment(e.start.getTime()).format('HH:mm')}`; 
            document.querySelector('#endtime').value = `${moment(e.end.getTime()).format('HH:mm')}`;

            // button styling
            document.querySelector('.modal-footer').style['justify-content'] = "end";

            // no choice but to use JQuery, need it for TUI anyway
            $('#appointment-modal').modal();

            // Store guide element for clearing when hiding modal
            guideElement.push(e.guide.guideElement);

        },
        'beforeUpdateSchedule': function(e) {

            // var schedule = e.schedule;
            // var changes = e.changes;

            // console.log('beforeUpdateSchedule', e);

            // if (changes && !changes.isAllDay && schedule.category === 'allday') {
            //     changes.category = 'time';
            // }

            // cal.updateSchedule(schedule.id, schedule.calendarId, changes);
            // refreshScheduleVisibility();
        },
        'beforeDeleteSchedule': function(e) {
            console.log('beforeDeleteSchedule', e);
            cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
        },
        'afterRenderSchedule': function(e) {
            var schedule = e.schedule;
            // var element = cal.getElement(schedule.id, schedule.calendarId);
            // console.log('afterRenderSchedule', element);
        },
        'clickTimezonesCollapseBtn': function(timezonesCollapsed) {
            console.log('timezonesCollapsed', timezonesCollapsed);

            if (timezonesCollapsed) {
                cal.setTheme({
                    'week.daygridLeft.width': '77px',
                    'week.timegridLeft.width': '77px'
                });
            } else {
                cal.setTheme({
                    'week.daygridLeft.width': '60px',
                    'week.timegridLeft.width': '60px'
                });
            }

            return true;
        }
    });

    // /**
    //  * Get time template for time and all-day
    //  * @param {Schedule} schedule - schedule
    //  * @param {boolean} isAllDay - isAllDay or hasMultiDates
    //  * @returns {string}
    //  */
    // function getTimeTemplate(schedule, isAllDay) {
    //     var html = [];
    //     var start = moment(schedule.start.toUTCString());
    //     if (!isAllDay) {
    //         html.push('<strong>' + start.format('HH:mm') + '</strong> ');
    //     }
    //     if (schedule.isPrivate) {
    //         html.push('<span class="calendar-font-icon ic-lock-b"></span>');
    //         html.push(' Private');
    //     } else {
    //         if (schedule.isReadOnly) {
    //             html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
    //         } else if (schedule.recurrenceRule) {
    //             html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
    //         } else if (schedule.attendees.length) {
    //             html.push('<span class="calendar-font-icon ic-user-b"></span>');
    //         } else if (schedule.location) {
    //             html.push('<span class="calendar-font-icon ic-location-b"></span>');
    //         }
    //         html.push(' ' + schedule.title);
    //     }

    //     return html.join('');
    // }

    /**
     * A listener for click the menu
     * @param {Event} e - click event
     */
    function onClickMenu(e) {
        var target = $(e.target).closest('a[role="menuitem"]')[0];
        var action = getDataAction(target);
        var options = cal.getOptions();
        var viewName = '';

        console.log(target);
        console.log(action);
        switch (action) {
            case 'toggle-daily':
                viewName = 'day';
                break;
            case 'toggle-weekly':
                viewName = 'week';
                break;
            case 'toggle-monthly':
                options.month.visibleWeeksCount = 0;
                viewName = 'month';
                break;
            case 'toggle-weeks2':
                options.month.visibleWeeksCount = 2;
                viewName = 'month';
                break;
            case 'toggle-weeks3':
                options.month.visibleWeeksCount = 3;
                viewName = 'month';
                break;
            case 'toggle-narrow-weekend':
                options.month.narrowWeekend = !options.month.narrowWeekend;
                options.week.narrowWeekend = !options.week.narrowWeekend;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.narrowWeekend;
                break;
            case 'toggle-start-day-1':
                options.month.startDayOfWeek = options.month.startDayOfWeek ? 0 : 1;
                options.week.startDayOfWeek = options.week.startDayOfWeek ? 0 : 1;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.startDayOfWeek;
                break;
            case 'toggle-workweek':
                options.month.workweek = !options.month.workweek;
                options.week.workweek = !options.week.workweek;
                viewName = cal.getViewName();

                target.querySelector('input').checked = !options.month.workweek;
                break;
            default:
                break;
        }

        cal.setOptions(options, true);
        cal.changeView(viewName, true);

        setDropdownCalendarType();
        setRenderRangeText();
    
    }

    function onClickNavi(e) {
        var action = getDataAction(e.target);

        switch (action) {
            case 'move-prev':
                cal.prev();
                break;
            case 'move-next':
                cal.next();
                break;
            case 'move-today':
                cal.today();
                break;
            default:
                return;
        }

        setRenderRangeText();
    
    }

    // MODAL FORM FUNCTIONALITY

    // no choice but to use JQuery, need it for TUI anyway
    $('#patient').selectize({ maxItems: '1'});

    // Create new appointment else update appointment
    const appointmentForm = document.querySelector('#appointment-form');
    appointmentForm.addEventListener('submit', e => {    
        e.preventDefault();
        const formData = new FormData(e.target);
        const appointmentData = Object.fromEntries(formData.entries());
        $('#appointment-modal').modal('hide'); // hide now to prevent multiple entries
    
        if (!appointmentData.appointmentId){

            // Create new appointment
            fetch('/calendar/appointment', {
                headers: { "Content-Type": "application/json" },
                method: 'POST',
                body: JSON.stringify(appointmentData)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(appointment => {

                // THIS MAY NOT BE NECC, CAN STORE NAME IN OPTIONS ELEMENT WITH CUSTOM ATTRIBUTE
                // fetch from db to get patient name. id and patientid can be gotten from data returned from post
                fetch(`/patients/${appointment.patient}`, {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                    method: 'GET'})
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                }).then(patient => {
                    // display in calendar grid
                    cal.createSchedules([
                        {
                            id: `${appointment._id}`,
                            calendarId: appointmentData.practitioner,
                            title: `${patient.firstname} ${patient.surname}`,
                            category: 'time',
                            start: `${appointment.start}`,
                            end: `${appointment.end}`,
                            attendees: [appointment.patient],
                            raw: `${appointment.type}`
                        }
                    ]); 
                });
            });
        } else {

            // Update Appointment
            fetch(`/calendar/appointment/${appointmentData.appointmentId}`, {
                headers: { "Content-Type": "application/json" },
                method: 'PUT',
                body: JSON.stringify(appointmentData)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then(appointment => {

                // THIS MAY NOT BE NECC, CAN STORE NAME IN OPTIONS ELEMENT WITH CUSTOM ATTRIBUTE
                // fetch from db to get patient name. id and patientid can be gotten from data returned from post
                fetch(`/patients/${appointment.patient}`, {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                    method: 'GET'})
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                }).then(patient => {

                    cal.updateSchedule(appointment._id, appointmentData.calendarId, {
                        calendarId: appointment.practitioner,
                        title: `${patient.firstname} ${patient.surname}`,
                        category: 'time',
                        start: `${appointment.start}`,
                        end: `${appointment.end}`,
                        attendees: [appointment.patient],
                        raw: `${appointment.type}`
                    });
                });
            });
        }
    });


    // Change href of view patient button and patient name hidden field when patient is changed (have to use jQuery for selectize)
    const selectPatient = $("#patient")[0].selectize;  
    selectPatient.on('change', function() {
        document.querySelector('#view-patient-button').href = `/patients/${selectPatient.getValue()}?currentView=${currentView}&showHistory=${showHistory}`;
        // document.querySelector('#patient-name') = selectPatient[selectPatient.selectedIndex].textContent;
        // ABOVE get this through custom attribute as text content has DOB
    });

    // Change appointment end time and abbreviation hidden field when appointment type selector changed
    const selectType = document.querySelector('#type');
    selectType.addEventListener('change', (e) => {
    
        const startTimeVal = document.querySelector('#starttime').value;
        const endTimeEl = document.querySelector('#endtime');
        const typeAbbr = document.querySelector('#abbreviation');

        const endTime = moment(startTimeVal, 'HH:mm:ss').add(selectType[selectType.selectedIndex].getAttribute('data-duration'), 'm').format('HH:mm');
        endTimeEl.value = endTime;
        
        typeAbbr.value = selectType[selectType.selectedIndex].getAttribute('data-abbreviation');

    });
    
    // delete appointment
    const deleteAppointmentButton = document.querySelector('.delete-button');
    deleteAppointmentButton.addEventListener('click', () => {
        const appointmentId = document.querySelector('#appointment-id').value;
        fetch(`/calendar/appointment/${appointmentId}`, {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(appointment => {
            $('#appointment-modal').modal('hide');
            cal.deleteSchedule(appointment._id, appointment.practitioner);
        });
    });

    function onChangeCalendars(e) {
        var calendarId = e.target.value;
        var checked = e.target.checked;
        var viewAll = document.querySelector('.lnb-calendars-item input');
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
        var allCheckedCalendars = true;

        if (calendarId === 'all') {
            allCheckedCalendars = checked;

            calendarElements.forEach(function(input) {
                var span = input.parentNode;
                input.checked = checked;
                span.style.backgroundColor = checked ? span.style.borderColor : 'transparent';
            });

            CalendarList.forEach(function(calendar) {
                calendar.checked = checked;
            });
        } else {

            CalendarList.find(calendar => calendar.id === calendarId).checked = checked;

            allCheckedCalendars = calendarElements.every(function(input) {
                return input.checked;
            });

            if (allCheckedCalendars) {
                viewAll.checked = true;
            } else {
                viewAll.checked = false;
            }
        }

        refreshScheduleVisibility();
    }

    function refreshScheduleVisibility() {
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

        CalendarList.forEach(function(calendar) {
            cal.toggleSchedules(calendar.id, !calendar.checked, false);
        });

        cal.render(true);

        calendarElements.forEach(function(input) {
            var span = input.nextElementSibling;
            span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
        });
    }

    function setDropdownCalendarType() {
        var calendarTypeName = document.getElementById('calendarTypeName');
        var calendarTypeIcon = document.getElementById('calendarTypeIcon');
        var options = cal.getOptions();
        var type = cal.getViewName();
        var iconClassName;

        if (type === 'day') {
            type = 'Daily';
            iconClassName = 'calendar-icon ic_view_day';
        } else if (type === 'week') {
            type = 'Weekly';
            iconClassName = 'calendar-icon ic_view_week';
        } else if (options.month.visibleWeeksCount === 2) {
            type = '2 weeks';
            iconClassName = 'calendar-icon ic_view_week';
        } else if (options.month.visibleWeeksCount === 3) {
            type = '3 weeks';
            iconClassName = 'calendar-icon ic_view_week';
        } else {
            type = 'Monthly';
            iconClassName = 'calendar-icon ic_view_month';
        }

        calendarTypeName.innerHTML = type;
        calendarTypeIcon.className = iconClassName;
    }

    function currentCalendarDate(format) {
      var currentDate = moment([cal.getDate().getFullYear(), cal.getDate().getMonth(), cal.getDate().getDate()]);

      return currentDate.format(format);
    }

    function setRenderRangeText() {
        var renderRange = document.getElementById('renderRange');
        var options = cal.getOptions();
        var viewName = cal.getViewName();

        var html = [];
        if (viewName === 'day') {
            html.push(currentCalendarDate('DD/MM/YYYY'));
        } else if (viewName === 'month' &&
            (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
            html.push(currentCalendarDate('MMMM YYYY'));
        } else {
            html.push(moment(cal.getDateRangeStart().getTime()).format('DD/MM/YYYY'));
            html.push(' ~ ');
            html.push(moment(cal.getDateRangeEnd().getTime()).format(' DD/MM/YYYY'));
        }
        renderRange.innerHTML = html.join('');
    }

    function setSchedules() {
        cal.clear();

        // Populate ScheduleList from DB 
        fetch(`/calendar/appointments`, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
            method: 'GET'})
        .then(response => {
            if (response.ok) {
                return response.json();
                }
            return Promise.reject(response);
        }).then(appointments => {

            Promise.all(appointments.map(appointment => {
                Promise.all([
                    fetch(`/patients/info/${appointment.patient}`, {
                        headers: { "X-Requested-With": "XMLHttpRequest" },
                        method: 'GET'}),
                    fetch(`calendar/appointment/abbrv/${appointment.type}`, {
                        headers: { "X-Requested-With": "XMLHttpRequest" },
                        method: 'GET'})
                    ])        
                .then(responses => {
                    if (responses[0].ok || responses[1].ok) {
                        return Promise.all(responses.map(response => {
                            return response.json();
                        }));
                    }
                    return Promise.reject(responses);
                })
                .then(data => {
                    const ScheduleList = [{
                        id: appointment._id,
                        calendarId: appointment.practitioner,
                        title: `${data[0].firstname} ${data[0].surname} (${data[1].abbreviation})`,
                        category: 'time',
                        start: appointment.start,
                        end: appointment.end,
                        attendees: [appointment.patient],
                        raw: `${appointment.type}`              
                    }];
                    cal.createSchedules(ScheduleList);
                });
            }));
        });

        refreshScheduleVisibility();
    }

    function setEventListener() {
        $('#menu-navi').on('click', onClickNavi);
        $('.dropdown-menu a[role="menuitem"]').on('click', onClickMenu);
        $('#lnb-calendars').on('change', onChangeCalendars);

        $('#btn-new-schedule').on('click', () => $('#appointment-modal').modal());

        // Tidy up after modal hidden
        $('#appointment-modal').on('hidden.bs.modal', e => {
            document.querySelector('.delete-button').style.display = 'none';
            document.querySelector('#view-patient-button').style.display = 'none';
            document.querySelector('.modal-footer').style['justify-content'] = 'space-between';
            document.querySelector('#appointment-form').reset();
            document.querySelector('#appointment-id').value = ''; //as reset() wont reset hidden input
            if (guideElement.length) guideElement[0].remove();
        });

        window.addEventListener('resize', resizeThrottled);
    }

    function getDataAction(target) {
        return target.dataset ? target.dataset.action : target.getAttribute('data-action');
    }

    resizeThrottled = tui.util.throttle(function() {
        cal.render();
    }, 50);

    window.cal = cal;

    setDropdownCalendarType();
    setRenderRangeText();
    setSchedules();
    setEventListener();

}

