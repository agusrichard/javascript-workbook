// const { useless, amazingFunction, filterByTerm } = require('./index')

// test('test useless function', () => {
//   expect(useless()).toBe(21)
// })

// const mockUseless = jest.fn(() => {
//   return 21
// })

// test('using mock', () => {
//   expect(amazingFunction(21, mockUseless)).toBe(42)
// })

// describe('Test filter term', () => {
//   test('it should filter by a search term (link)', () => {
//     const input = [
//       { id: 1, url: "https://www.url1.dev" },
//       { id: 2, url: "https://www.url2.dev" },
//       { id: 3, url: "https://www.link3.dev" }
//     ]

//     const output = [{ id: 3, url: "https://www.link3.dev" }]

//     expect(filterByTerm(input, "link")).toEqual(output)

//     expect(filterByTerm(input, "LINK")).toEqual(output)
//   })
// })

import { doSomething } from './index'

test('plain mock function', () => {
  const mock = jest.fn()

  let result = mock('foo')
  expect(result).toBeUndefined()
  expect(mock).toHaveBeenCalled()
  expect(mock).toHaveBeenCalledTimes(1)
  expect(mock).toHaveBeenCalledWith('foo')
})

test('return values', () => {
  const mock = jest.fn(() => 'bar')

  let result = mock('foo')
  expect(result).toBe('bar')
  expect(mock).toHaveBeenCalled()
  expect(mock).toHaveBeenCalledWith('foo')
})

test('mock promise resolution', () => {
  const mock = jest.fn()
  mock.mockResolvedValue('bar')

  expect(mock('foo')).resolves.toBe('bar')
})

test('use callback function', () => {
  const x = 1
  const y = 1
  const mock = jest.fn(() => x + y)
  expect(doSomething(x, y, mock)).toBe(x + y)
  expect(mock).toHaveBeenCalled()
})