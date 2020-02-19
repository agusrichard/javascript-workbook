const _ = require('lodash');

const numbers = [2, 3, 5, 3, 5, 2, 5];

_.each(numbers, function(number, i) {
  console.log(number);
});