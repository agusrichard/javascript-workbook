# JavaScript Clean Code

## [JavaScript Clean Code — Quick Best Practices](https://javascript.plainenglish.io/javascript-clean-code-best-practices-461c24c53cae)

> A professional developer will write the code for the future self and for the “other guy” not just for the machine


> Even bad code can function, but if the code isn’t clean, it can bring a development organization to its knees.

### Strong Type Checks

- Use === instead of ==
- By using strong type check we are forcing the type check. No type assertion.
  
### Variables

Name your variables in a way that they reveal the intention behind it

```javascript
// Bad
let daysSLV = 10;

let y = new Date().getFullYear();

let ok;

if (user.age > 30) {
  ok = true;
}

// Good 
const MAX_AGE = 30;

let daysSinceLastVisit = 10;

let currentYear = new Date().getFullYear();

...

const isUserOlderThanAllowed = user.age > MAX_AGE;
```

- Don't add unneeded words
```javascript
// Bad
let nameValue
let theProduct

// Good
let name
let product
```

- Don’t enforce the need for memorizing the variable context
```javascript
// Bad
const products = ["T-Shirt", "Shoes", "Watches", "Bags"];

products.forEach(p => {
  doSomething();
  doSomethingElse();
  // ...
  // ...
  // ...
  // ...
  // What is `p` for?
  register(p);
});

// Good
const products = ["T-Shirt", "Shoes", "Watches", "Bags"];

products.forEach(product => {
  doSomething();
  doSomethingElse();
  // ...
  // ...
  // ...
  register(product);
});
```
- Don’t add unnecessary context
```javascript
// Bad

const product = {
  productId: 1,
  productName: "T-Shirt",
  productPrice: 8.99,
  productUnits: 12
};

...

product.productName;

// Good
const product = {
  id: 1,
  name: "T-Shirt",
  price: 8.99,
  units: 12
};

...

product.name;
```


### Functions
- Considering that it represents a certain behavior, a function name should be a verb or a phrase fully exposing the intent behind it as well as the intent of the arguments.

```javascript
// Bad
function email(user) {
  // implementation
}


// Good
function sendEmailUser(emailAddress) {
  // implementation
}
```

- Avoid a long number of arguments
- Use default arguments instead of conditionals
- Avoid executing multiple actions within a single function. </br>
  Refactor our code to make it do one thing only. Single Responsibility Principle.
- Use 'Object.assign’ to set default objects
```javascript
// Bad
const shapeConfig = {
  type: "circle",
  width: 150,
  height: null
};

function createShape(config) {
  config.type = config.type || "circle";
  config.width = config.width || 300;
  config.height = config.height || 300;
}

createShape(shapeConfig);

// Good
const shapeConfig = {
  type: "circle",
  width: 150
  // Exclude the 'height' key
};

function createShape(config) {
  config = Object.assign(
    {
      type: "circle",
      width: 300,
      height: 300
    },
    config
  );
  ...
}
  
createShape(shapeConfig);
```

- Don’t use flags as parameters because they are telling you that the function is doing more than it should

```javascript
// Bad
function createFile(name, isPublic) {
  if (isPublic) {
    fs.create(`./public/${name}`);
  } else {
    fs.create(name);
  }
}

// Good

function createFile(name) {
  fs.create(name);
}

function createPublicFile(name) {
  createFile(`./public/${name}`);
}
```

- Don’t pollute the Globals
If you need to extend an existing object use ES Classes and inheritance instead of creating the function on the prototype chain of the native object.


```javascript
// Bad
Array.prototype.myFunction = function myFunction() {
  // implementation
};

// Good
class SuperArray extends Array {
  myFunc() {
    // implementation
  }
}
```

### Conditionals
- Use conditional shorthand
- Avoid conditionals whenever possible

### ES Classes
- Use method chaining
  
### Avoid Using Eval

### Avoid In General
- Keep our code dry
- Remove dead code


## References:
- https://javascript.plainenglish.io/javascript-clean-code-best-practices-461c24c53cae