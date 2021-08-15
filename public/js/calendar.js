const Calendar = tui.Calendar;

const calendar = new Calendar('#calendar', {
  defaultView: 'week',
  taskView: false,
  scheduleView: ['time'],
  template: {
    monthDayname: function(dayname) {
      return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    }
  },
  useDetailPopup: true
});

