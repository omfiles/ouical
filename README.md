# OuiCal

A simple JS script that enables you to add an "add to calendar" button to your events.

Call 'createAddToCalendarLinks' with your event info, pass in any optional parameters such as a class and/ or id and boom! Insert your add-to-calendar div wherever you'd like.

The only fields that are mandatory are:

  - Start time
  - End time (or event duration, in minutes)
  - Event tile

## Example

    var markup = addToCalendar({
      title: 'blah',
      start: new Date('June 15, 2013 19:00'),
      end: new Date('June 15, 2013 23:00'), // must have duration *or* end
      duration: 120, // minutes
      address: 'blah',
      description: 'blah',
      text: 'calendar add' // optional, what the button should say
    });

    document.querySelector('#cal').appendChild(markup);

[Here is the live example](http://carlsednaoui.github.io/ouical/example.html)

## Calendar Generator
Need to generate an add-to-calendar on the fly? No problem, [go here](http://carlsednaoui.github.io/ouical/generator/generator.html).

## License
[MIT](http://opensource.org/licenses/MIT)