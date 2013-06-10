# OuiCal

A simple JS script that enables you to add an "add to calendar" button to your events.

Call 'addToCalendar' with your event info, pass in any optional parameters such as a class and/ or id and boom! Insert your add-to-calendar div wherever you'd like.

The only fields that are mandatory are:
  
  - Event tile
  - Start time
  - End time or event duration (in minutes)

## Example

    var button = addToCalendar({
      title: 'blah',
      start: new Date('June 15, 2013 19:00'),
      end: new Date('June 15, 2013 23:00'), // must have duration *or* end
      duration: 120, // minutes
      address: 'blah',
      description: 'blah',
      text: 'calendar add' // optional, what the button should say
    });

    document.querySelector('#cal').appendChild(button);

[Here is the live example](http://carlsednaoui.github.io/ouical/example.html)

## Contributing

We're very open to any contributions/improvements you have in mind. Just fork this repo, make your changes, and submit a pull request! To build the minifed file, follow the steps below:

- make sure [nodejs](http://nodejs.org) is installed
- run `npm install grunt-cli -g`
- in this directory, run `npm install`
- after that's done, run `grunt` to build, or `grunt watch` to watch the js file and build whenever you make changes
- check to make sure everything is good in `test/example.html`

## Calendar Generator
Need to generate an add-to-calendar on the fly? No problem, [go here](http://carlsednaoui.github.io/ouical/generator/generator.html).

## License
[MIT](http://opensource.org/licenses/MIT)