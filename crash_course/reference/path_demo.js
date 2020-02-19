const path = require('path');

// Path to filename
console.log(__filename);

// Base filename
console.log(path.basename(__filename));

// Directory name
console.log(path.dirname(__filename));

// File extension
console.log(path.extname(__filename));

// Create path object
console.log(path.parse(__filename));

//  Concatenate paths
console.log(path.join(__dirname, 'test', 'hello.html'))
// ./test/hello.html