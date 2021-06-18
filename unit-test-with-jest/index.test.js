const { useless, amazingFunction, filterByTerm } = require('./index')

test('test useless function', () => {
  expect(useless()).toBe(21)
})

const mockUseless = jest.fn(() => {
  return 21
})

test('using mock', () => {
  expect(amazingFunction(21, mockUseless)).toBe(42)
})

describe('Test filter term', () => {
  test('it should filter by a search term (link)', () => {
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ]

    const output = [{ id: 3, url: "https://www.link3.dev" }]

    expect(filterByTerm(input, "link")).toEqual(output)

    expect(filterByTerm(input, "LINK")).toEqual(output)
  })
})