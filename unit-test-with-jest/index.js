function useless() {
  console.log('doing some expensive operation here')
  return 21
}

function amazingFunction(num, callback) {
  return num + callback()
}

function filterByTerm(inputArr, searchTerm) {
  const regex = new RegExp(searchTerm, "i");
  return inputArr.filter(function(arrayElement) {
    return arrayElement.url.match(regex);
  });
}

module.exports = { useless, amazingFunction, filterByTerm }