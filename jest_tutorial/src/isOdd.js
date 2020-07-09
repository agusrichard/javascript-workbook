function isOdd(arr) {
  filtered = arr.filter(num => num % 2 !== 0)
  if (filtered.length === 0) {
    return true
  }
  return false
}

module.exports = isOdd