const isOdd = require('../src/isOdd')

describe("isOdd Tests", () => {
  test('is it all odds?', () => {

    expect(isOdd([1, 2, 3, 4, 5])).toBeFalsy()
    expect(isOdd([2, 2, 2, 4, 6])).toBeTruthy()
  })
})