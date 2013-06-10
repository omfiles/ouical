(function(exports) {

  var MS_IN_MINUTES = 60 * 1000;

  var calendarGenerators = {
    google: function(event) {
      var startTime = formatTime(event.start);
      var endTime = calculateEndTime(event);

      var href = encodeURI([
        'https://www.google.com/calendar/render',
        '?action=TEMPLATE',
        '&text=' + (event.title || ''),
        '&dates=' + (startTime || ''),
        '/' + (endTime || ''),
        '&details=' + (event.description || ''),
        '&location=' + (event.address || ''),
        '&sprop=&sprop=name:'
      ].join(''));
      return '<a class="icon-google" target="_blank" href="' +
        href + '">Google Calendar</a>';
    },

    yahoo: function(event) {
      var eventDuration = event.end ?
        ((event.end.getTime() - event.start.getTime())/ MS_IN_MINUTES) :
        event.duration;

      // Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
      var yahooHourDuration = eventDuration < 600 ?
        '0' + Math.floor((eventDuration / 60)) :
        Math.floor((eventDuration / 60)) + '';

      var yahooMinuteDuration = eventDuration % 60 < 10 ?
        '0' + eventDuration % 60 :
        eventDuration % 60 + '';

      var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;

      // Remove timezone from event time
      var st = formatTime(new Date(event.start - (event.start.getTimezoneOffset() *
                                                  MS_IN_MINUTES))) || '';

      var href = encodeURI([
        'http://calendar.yahoo.com/?v=60&view=d&type=20',
        '&title=' + (event.title || ''),
        '&st=' + st,
        '&dur=' + (yahooEventDuration || ''),
        '&desc=' + (event.description || ''),
        '&in_loc=' + (event.address || '')
      ].join(''));

      return '<a class="icon-yahoo" target="_blank" href="' +
        href + '">Yahoo! Calendar</a>';
    },

    ics: function(event, eClass, calendarName) {
      var startTime = formatTime(event.start);
      var endTime = calculateEndTime(event);

      var href = encodeURI(
        'data:text/calendar;charset=utf8,' + [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          'URL:' + document.URL,
          'DTSTART:' + (startTime || ''),
          'DTEND:' + (endTime || ''),
          'SUMMARY:' + (event.title || ''),
          'DESCRIPTION:' + (event.description || ''),
          'LOCATION:' + (event.address || ''),
          'END:VEVENT',
          'END:VCALENDAR'].join('\n'));

      return '<a class="' + eClass + '" target="_blank" href="' +
        href + '">' + calendarName + '</a>';
    },

    ical: function(evnt) {
      return this.ics(evnt, 'icon-ical', 'iCal');
    },

    outlook: function(evnt) {
      return this.ics(evnt, 'icon-outlook', 'Outlook');
    }
  };

  function formatTime(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  function calculateEndTime(event) {
    return event.end ?
      formatTime(event.end) :
      formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
  };

  function generateCalendars(evnt) {
    return {
      google: calendarGenerators.google(evnt),
      yahoo: calendarGenerators.yahoo(evnt),
      ical: calendarGenerators.ical(evnt),
      outlook: calendarGenerators.outlook(evnt)
    };
  };

  // Make sure we have the necessary event data, such as start time and event duration
  // TODO: have this return what's missing
  function validParams(params) {
    if (params == undefined) { return 'options' }
    if (!params.start) { return 'start time' }
    if (params.end == undefined && params.duration == undefined) { return 'end time' }
    return true
  };

  function generateMarkup(calendars, text) {
    var result = document.createElement('div');
    var id = Math.floor(Math.random() * 1000000);
    var text = text || '+ Add to my Calendar';

    result.innerHTML = '<label for="checkbox-for-' +
      id + '" class="add-to-calendar-checkbox">' + text + '</label>';
    result.innerHTML += '<input name="add-to-calendar-checkbox" class="add-to-calendar-checkbox" id="checkbox-for-' + id + '" type="checkbox">';

    Object.keys(calendars).forEach(function(services) {
      result.innerHTML += calendars[services];
    });

    return result;
  };

  // the main event
  function addToCalendar(params) {
    var valid = validParams(params);
    if (typeof valid === 'string') {
      var msg = 'ERROR: ' + valid + ' missing';
      var err = document.createElement('div');
      err.innerHTML = msg;
      err.style.color = 'red';
      console.log(msg);
      return err
    }
    return generateMarkup(generateCalendars(params), params.text);
  };

  // expose public api
  exports.addToCalendar = addToCalendar;

})(this);
