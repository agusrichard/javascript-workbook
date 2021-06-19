# Learn Testing React App with Jest

## [A Practical Guide To Testing React Applications With Jest](https://www.smashingmagazine.com/2020/06/practical-guide-testing-react-applications-jest/)

The purpose of test:
- To prevent regression. Regression is the reappearance of a bug that had previously been fixed. It makes a feature stop functioning as intended after a certain event occurs.
- Testing ensures the functionality of complex components and modular applications.
- Testing is required for the effective performance of a software application or product.
- Testing makes an app more robust and less prone to error.

### Unit test
- Individual units or components of the software are tested
- In unit testing, individual procedures or functions are tested to guarantee that they are operating properly

### Component test
- Component testing verifies the functionality of an individual part of an application
- React applications are made up of several components, so component testing deals with testing these components individually.


### Snapshot test
- A snapshot test makes sure that the user interface (UI) of a web application does not change unexpectedly.

### Create a Test File
- We can write our test files on __test__
- Jest will look through all files with file pattern .spec.js.
- From shallow from enzyme to check rendered component without its child.
- If we want to render the component with its children, then use mount.

### Skipping or Isolating a Test
```javascript
it.skip("renders without crashing", () => {
  shallow(<App />);
});
```

### Test React Component
```javascript
describe("", () => {
  it("accepts user account props", () => {
    const wrapper = mount(<Account user={user} />);
    expect(wrapper.props().user).toEqual(user);
  });
  it("contains users account email", () => {
    const wrapper = mount(<Account user={user} />);
    const value = wrapper.find("p").text();
    expect(value).toEqual("david@gmail.com");
  });
});

```

## References:
- https://www.smashingmagazine.com/2020/06/practical-guide-testing-react-applications-jest/