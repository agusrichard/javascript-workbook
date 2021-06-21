# Learn React Testing Library

## [React Testing Library – Tutorial with JavaScript Code Examples](https://www.freecodecamp.org/news/react-testing-library-tutorial-javascript-example-code/)

- React Testing Library is a testing utility tool that's built to test the actual DOM tree rendered by React on the browser.
- The goal of the library is to help you write tests that resemble how a user would use your application.

### How to Use React Testing Library

- We can use `screen.debug()` to know the inside html of our react app. This thing would be handy for debugging session. Just like the name suggests.

### Methods for Finding Elements
- getByText(): find the element by its textContent value
- getByRole(): by its role attribute value
- getByLabelText(): by its label attribute value
- getByPlaceholderText(): by its placeholder attribute value
- getByAltText(): by its alt attribute value
- getByDisplayValue(): by its value attribute, usually for <input> elements
- getByTitle(): by its title attribute value
- Use getByTestId() to find an element by its data-testid attribute.

```javascript
import { render, screen } from '@testing-library/react';

render(<div data-testid="custom-element" />);
const element = screen.getByTestId('custom-element');
```

### Testing User Generated Events

```javascript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Test theme button toggle", () => {
  render(<App />);
  const buttonEl = screen.getByText(/Current theme/i);
    
  userEvent.click(buttonEl);
  expect(buttonEl).toHaveTextContent(/dark/i);
});
```

## References:
- https://www.freecodecamp.org/news/react-testing-library-tutorial-javascript-example-code/