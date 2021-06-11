const { useless, amazingFunction } = require('./index')

test('test useless function', () => {
  expect(useless()).toBe(21)
})

const mockUseless = jest.fn(() => {
  return 21
})

test('using mock', () => {
  expect(amazingFunction(21, mockUseless)).toBe(42)
})