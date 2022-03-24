export function useless() {
  console.log('doing some expensive operation here')
  return 21
}

export function amazingFunction(num, callback) {
  return num + callback()
}

export function filterByTerm(inputArr, searchTerm) {
  const regex = new RegExp(searchTerm, "i");
  return inputArr.filter(function(arrayElement) {
    return arrayElement.url.match(regex);
  });
}

export function doSomething(x, y, callback) {
  return callback(x, y)
}


import * as math from './math.js';

export const doAdd      = (a, b) => math.add(a, b);
export const doSubtract = (a, b) => math.subtract(a, b);
export const doMultiply = (a, b) => math.multiply(a, b);
export const doDivide   = (a, b) => math.divide(a, b);