# Learn Unit Test Using Jest

## [How to Start Unit Testing Your JavaScript Code](https://www.freecodecamp.org/news/how-to-start-unit-testing-javascript/)


### Different Types of Testing

#### Unit tests

- Test single part of our implementation
- Test a unit (small part of our code)
- No dependencies or integrations

#### Integration tests

- Usually involves communication to other units (database, file system or another third party)
- Typically involves setup and initialization.
- If our code using another module in our app.

#### Funcional tests

- The perspective is from user's point of view

![Pyramid of Test](https://www.freecodecamp.org/news/content/images/2020/03/presentation.jpg)


### Why Should I Bother Writing Unit Tests?

- Be confident that our code works
  By writing unit tests we can become confident that our code is really functional, no need to hope for our app to work.
- Make better architectural decisions.
  Unit tests help us to better structure our code and achieve separation of concerns.
- Pinpoint functionality before coding.
  With unit test, we start to think about many possibilities our function will fail. By assessing this possibilities as test cases and implement the production and test code, we make sure that our code is robust.

### Let's Write Some Unit Tests in JavaScript

We can write the test in the same file as our production code, but the good practice is to separate unit tests into a dedicated file.

The common naming patterns include {filename}.test.js and {filename}.spec.js

A mock is a substitute for the original object. It allows us to separate dependencies and real data from the tested method's implementation just like dummies help with crash tests of cars instead of real people.

If we didn't use the mock, we'd be testing both this function and the store. That would be an integration test and we would likely need to mock the used database.

```javascript
// index.js
function useless() {
    return 21
}

module.exports = { useless }

// index.test.js
const { useless } = require('./index')

test('test useless function', () => {
  expect(useless()).toBe(21)
})
```

#### Mocking a Service

```javascript
// index.js
function useless() {
    console.log('doing some expensive operation here')
    return 21
}

function amazingFunction(num, callback) {
    return num + callback()
}

module.exports = { useless, amazingFunction }

// index.test.js
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
```

#### Coverage Report

We can use this command to get coverage report: `jest --coverage`

### Summary

- clearly define implementation requirements,
- better design your code and separate concerns,
- discover issues you may introduce with your newer commits,
- and give you confidence that your code works.

## References:
- https://www.freecodecamp.org/news/how-to-start-unit-testing-javascript/
- https://www.sitepoint.com/test-react-components-jest/
