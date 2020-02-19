const EventEmitter = require('events');

// Create class
class MyEmitter extends EventEmitter { }

// Init object
const myEmitter = new MyEmitter();

// Create event listener
myEmitter.on('event', () => console.log('Event fired...'))

// Init event
myEmitter.emit('event');