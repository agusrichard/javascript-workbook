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
  return 21;
}

module.exports = { useless };

// index.test.js
const { useless } = require("./index");

test("test useless function", () => {
  expect(useless()).toBe(21);
});
```

#### Mocking a Service

```javascript
// index.js
function useless() {
  console.log("doing some expensive operation here");
  return 21;
}

function amazingFunction(num, callback) {
  return num + callback();
}

module.exports = { useless, amazingFunction };

// index.test.js
const { useless, amazingFunction } = require("./index");

test("test useless function", () => {
  expect(useless()).toBe(21);
});

const mockUseless = jest.fn(() => {
  return 21;
});

test("using mock", () => {
  expect(amazingFunction(21, mockUseless)).toBe(42);
});
```

#### Coverage Report

We can use this command to get coverage report: `jest --coverage`

### Summary

- clearly define implementation requirements,
- better design your code and separate concerns,
- discover issues you may introduce with your newer commits,
- and give you confidence that your code works.

## [Jest Tutorial for Beginners: Getting Started With JavaScript Testing](https://www.valentinog.com/blog/jest/)

### What is Jest?

Jest Tutorial for Beginners: Getting Started With JavaScript Testing

Describe is a jest method for containing one or more related tests. We use this to write test suite.

```javascript
describe("Filter function", () => {
  // test stuff
});
```

`test` method is the actual test code block.

```javascript
describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    // actual test
  });
});
```

The actual test code:

```javascript
describe("Test filter term", () => {
  test("it should filter by a search term (link)", () => {
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" },
    ];

    const output = [{ id: 3, url: "https://www.link3.dev" }];

    expect(filterByTerm(input, "link")).toEqual(output);

    expect(filterByTerm(input, "LINK")).toEqual(output);
  });
});
```

## [Understanding Jest Mocks](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c)

### The Mock Function

- The goal for mocking is to replace something we don’t control with something we do
- The Mock Function provides features to:
  - Capture calls
  - Set return values
  - Change the implementation
- Snippet:

  ```javascript
  test("plain mock function", () => {
    const mock = jest.fn();

    let result = mock("foo");
    expect(result).toBeUndefined();
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith("foo");
  });
  ```

- Snippet:

  ```javascript
  test("mock implementation", () => {
    const mock = jest.fn(() => "bar");

    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });

  test("also mock implementation", () => {
    const mock = jest.fn().mockImplementation(() => "bar");

    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });

  test("mock implementation one time", () => {
    const mock = jest.fn().mockImplementationOnce(() => "bar");

    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");

    expect(mock("baz")).toBe(undefined);
    expect(mock).toHaveBeenCalledWith("baz");
  });

  test("mock return value", () => {
    const mock = jest.fn();
    mock.mockReturnValue("bar");

    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });

  test("mock promise resolution", () => {
    const mock = jest.fn();
    mock.mockResolvedValue("bar");

    expect(mock("foo")).resolves.toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });
  ```

### Dependency Injection

- One of the common ways to use the Mock Function is by passing it directly as an argument to the function you are testing.
- Snippet:

  ```javascript
  const doAdd = (a, b, callback) => {
    callback(a + b);
  };

  test("calls callback with arguments added", () => {
    const mockCallback = jest.fn();
    doAdd(1, 2, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(3);
  });
  ```

### Mocking Modules and Functions

- There are three main types of module and function mocking in Jest:
  - jest.fn: Mock a function
  - jest.mock: Mock a module
  - jest.spyOn: Spy or mock a function

### Mock a function with jest.fn

- The most basic strategy for mocking is to reassign a function to the Mock Function. Then, anywhere the reassigned functions are used, the mock will be called instead of the original function:
- Snippet:

  ```javascript
  import * as app from "./app";
  import * as math from "./math";

  math.add = jest.fn();
  math.subtract = jest.fn();

  test("calls math.add", () => {
    app.doAdd(1, 2);
    expect(math.add).toHaveBeenCalledWith(1, 2);
  });

  test("calls math.subtract", () => {
    app.doSubtract(1, 2);
    expect(math.subtract).toHaveBeenCalledWith(1, 2);
  });
  ```

- This type of mocking is less common for a couple reasons:
  - jest.mock does this automatically for all functions in a module
  - jest.spyOn does the same thing but allows restoring the original function

### Mock a module with jest.mock

- A more common approach is to use jest.mock to automatically set all exports of a module to the Mock Function. So, calling jest.mock('./math.js'); essentially sets math.js to:
  ```javascript
  export const add = jest.fn();
  export const subtract = jest.fn();
  export const multiply = jest.fn();
  export const divide = jest.fn();
  ```
- Snippet:

  ```javascript
  import * as app from "./app";
  import * as math from "./math";

  // Set all module functions to jest.fn
  jest.mock("./math.js");

  test("calls math.add", () => {
    app.doAdd(1, 2);
    expect(math.add).toHaveBeenCalledWith(1, 2);
  });

  test("calls math.subtract", () => {
    app.doSubtract(1, 2);
    expect(math.subtract).toHaveBeenCalledWith(1, 2);
  });
  ```

### Spy or mock a function with jest.spyOn

- Sometimes you only want to watch a method be called, but keep the original implementation. Other times you may want to mock the implementation, but restore the original later in the suite.
- Here we simply “spy” calls to the math function, but leave the original implementation in place:

  ```javascript
  import * as app from "./app";
  import * as math from "./math";

  test("calls math.add", () => {
    const addMock = jest.spyOn(math, "add");

    // calls the original implementation
    expect(app.doAdd(1, 2)).toEqual(3);

    // and the spy stores the calls to add
    expect(addMock).toHaveBeenCalledWith(1, 2);
  });
  ```

- Snippet:

  ```javascript
  import * as app from "./app";
  import * as math from "./math";

  test("calls math.add", () => {
    const addMock = jest.spyOn(math, "add");

    // override the implementation
    addMock.mockImplementation(() => "mock");
    expect(app.doAdd(1, 2)).toEqual("mock");

    // restore the original implementation
    addMock.mockRestore();
    expect(app.doAdd(1, 2)).toEqual(3);
  });
  ```

- The key thing to remember about jest.spyOn is that it is just sugar for the basic jest.fn() usage. We can achieve the same goal by storing the original implementation, setting the mock implementation to to original, and re-assigning the original later:

  ```javascript
  import * as app from "./app";
  import * as math from "./math";

  test("calls math.add", () => {
    // store the original implementation
    const originalAdd = math.add;

    // mock add with the original implementation
    math.add = jest.fn(originalAdd);

    // spy the calls to add
    expect(app.doAdd(1, 2)).toEqual(3);
    expect(math.add).toHaveBeenCalledWith(1, 2);

    // override the implementation
    math.add.mockImplementation(() => "mock");
    expect(app.doAdd(1, 2)).toEqual("mock");
    expect(math.add).toHaveBeenCalledWith(1, 2);

    // restore the original implementation
    math.add = originalAdd;
    expect(app.doAdd(1, 2)).toEqual(3);
  });
  ```

## References:

- https://www.freecodecamp.org/news/how-to-start-unit-testing-javascript/
- https://www.valentinog.com/blog/jest/
- https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
