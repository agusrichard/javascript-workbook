# JavaScript Clean Code

</br>

## List of Contents:

### 1. [JavaScript Clean Code — Quick Best Practices](#content-1)

### 2. [Writing Clean JavaScript — ES6 Edition](#content-2)

### 3. [Worst JavaScript practices that degrade code quality](#content-3)

</br>

---

## Contents

## [JavaScript Clean Code — Quick Best Practices](https://javascript.plainenglish.io/javascript-clean-code-best-practices-461c24c53cae) <span id="content-1"><span>

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
let nameValue;
let theProduct;

// Good
let name;
let product;
```

- Don’t enforce the need for memorizing the variable context

```javascript
// Bad
const products = ["T-Shirt", "Shoes", "Watches", "Bags"];

products.forEach((p) => {
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

products.forEach((product) => {
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

**[⬆ back to top](#list-of-contents)**

</br>

---

## [Writing Clean JavaScript — ES6 Edition](https://medium.com/geekculture/writing-clean-javascript-es6-edition-834e83abc746) <span id="content-2"><span>

### Introduction

- Clean code is not just code that works, but rather code that can be easily read, reused, and refactored by others.

### 1. Variables

- Use meaningful names
- The rule of thumb is that most JavaScript variables are in Camel Case (camelCase).
- Example:

  ```javascript
  // Don't ❌
  const foo = "JDoe@example.com";
  const bar = "John";
  const age = 23;
  const qux = true;

  // Do ✅
  const email = "John@example.com";
  const firstName = "John";
  const age = 23;
  const isActive = true;
  ```

- Avoid adding unnecessary contexts

  ```javascript
  // Don't ❌
  const user = {
    userId: "296e2589-7b33-400a-b762-007b730c8e6d",
    userEmail: "JDoe@example.com",
    userFirstName: "John",
    userLastName: "Doe",
    userAge: 23,
  };

  user.userId;

  // Do ✅
  const user = {
    id: "296e2589-7b33-400a-b762-007b730c8e6d",
    email: "JDoe@example.com",
    firstName: "John",
    lastName: "Doe",
    age: 23,
  };

  user.id;
  ```

- Avoid hardcoded values

  ```javascript
  // Don't ❌
  setTimeout(clearSessionData, 900000);

  // Do ✅
  const SESSION_DURATION_MS = 15 * 60 * 1000;

  setTimeout(clearSessionData, SESSION_DURATION_MS);
  ```

### 2. Functions

- Function names usually have the form of action verbs, with the possible exception of functions that return booleans — which can have the form of a “Yes or No” question.

  ```javascript
  // Don't ❌
  function toggle() {
    // ...
  }

  function agreed(user) {
    // ...
  }

  // Do ✅
  function toggleThemeSwitcher() {
    // ...
  }

  function didAgreeToAllTerms(user) {
    // ...
  }
  ```

- Use default arguments

  ```javascript
  // Don't ❌
  function printAllFilesInDirectory(dir) {
    const directory = dir || "./";
    //   ...
  }

  // Do ✅
  function printAllFilesInDirectory(dir = "./") {
    // ...
  }
  ```

### Limit the number of arguments

- As controversial as this rule might be, functions should have 0, 1, or 2 arguments.

  ```javascript
  // Don't ❌
  function sendPushNotification(title, message, image, isSilent, delayMs) {
    // ...
  }

  sendPushNotification("New Message", "...", "http://...", false, 1000);

  // Do ✅
  function sendPushNotification({ title, message, image, isSilent, delayMs }) {
    // ...
  }

  const notificationConfig = {
    title: "New Message",
    message: "...",
    image: "http://...",
    isSilent: false,
    delayMs: 1000,
  };

  sendPushNotification(notificationConfig);
  ```

- Avoid executing multiple actions in a function
- A function should do one thing at a time. This rule helps reduce the function’s size and complexity, which results in easier testing, debugging, and refactoring.

  ```javascript
  // Don't ❌
  function pingUsers(users) {
    users.forEach((user) => {
      const userRecord = database.lookup(user);
      if (!userRecord.isActive()) {
        ping(user);
      }
    });
  }

  // Do ✅
  function pingInactiveUsers(users) {
    users.filter(!isUserActive).forEach(ping);
  }

  function isUserActive(user) {
    const userRecord = database.lookup(user);
    return userRecord.isActive();
  }
  ```

- Avoid using flags as arguments

  ```javascript
  // Don't ❌
  function createFile(name, isPublic) {
    if (isPublic) {
      fs.create(`./public/${name}`);
    } else {
      fs.create(name);
    }
  }

  // Do ✅
  function createFile(name) {
    fs.create(name);
  }

  function createPublicFile(name) {
    createFile(`./public/${name}`);
  }
  ```

- Do not repeat yourself (DRY)

  ```javascript
  // Don't ❌
  function renderCarsList(cars) {
    cars.forEach((car) => {
      const price = car.getPrice();
      const make = car.getMake();
      const brand = car.getBrand();
      const nbOfDoors = car.getNbOfDoors();

      render({ price, make, brand, nbOfDoors });
    });
  }

  function renderMotorcyclesList(motorcycles) {
    motorcycles.forEach((motorcycle) => {
      const price = motorcycle.getPrice();
      const make = motorcycle.getMake();
      const brand = motorcycle.getBrand();
      const seatHeight = motorcycle.getSeatHeight();

      render({ price, make, brand, seatHeight });
    });
  }

  // Do ✅
  function renderVehiclesList(vehicles) {
    vehicles.forEach((vehicle) => {
      const price = vehicle.getPrice();
      const make = vehicle.getMake();
      const brand = vehicle.getBrand();

      const data = { price, make, brand };

      switch (vehicle.type) {
        case "car":
          data.nbOfDoors = vehicle.getNbOfDoors();
          break;
        case "motorcycle":
          data.seatHeight = vehicle.getSeatHeight();
          break;
      }

      render(data);
    });
  }
  ```

- Avoid side effects
- In JavaScript, you should favor functional over imperative patterns. In other words, keep functions pure unless needed otherwise.
- Side effects can modify shared states and resources, resulting in undesired behaviors.

  ```javascript
  // Don't ❌
  let date = "21-8-2021";

  function splitIntoDayMonthYear() {
    date = date.split("-");
  }

  splitIntoDayMonthYear();

  // Another function could be expecting date as a string
  console.log(date); // ['21', '8', '2021'];

  // Do ✅
  function splitIntoDayMonthYear(date) {
    return date.split("-");
  }

  const date = "21-8-2021";
  const newDate = splitIntoDayMonthYear(date);

  // Original vlaue is intact
  console.log(date); // '21-8-2021';
  console.log(newDate); // ['21', '8', '2021'];
  ```

- If you need to somewhat mutate a value, just returned the copied and mutated of that value:

  ```javascript
  // Don't ❌
  function enrollStudentInCourse(course, student) {
    course.push({ student, enrollmentDate: Date.now() });
  }

  // Do ✅
  function enrollStudentInCourse(course, student) {
    return [...course, { student, enrollmentDate: Date.now() }];
  }
  ```

### 3. Conditionals

- Use non-negative conditionals

  ```javascript
  // Don't ❌
  function isUserNotVerified(user) {
    // ...
  }

  if (!isUserNotVerified(user)) {
    // ...
  }

  // Do ✅
  function isUserVerified(user) {
    // ...
  }

  if (isUserVerified(user)) {
    // ...
  }
  ```

- Use shorthands whenever possible

  ```javascript
  // Don't ❌
  if (isActive === true) {
    // ...
  }

  if (firstName !== "" && firstName !== null && firstName !== undefined) {
    // ...
  }

  const isUserEligible = user.isVerified() && user.didSubscribe() ? true : false;

  // Do ✅
  if (isActive) {
    // ...
  }

  if (!!firstName) {
    // ...
  }

  const isUserEligible = user.isVerified() && user.didSubscribe();
  view raw
  ```

- Avoid branching and return soon

  ```javascript
  // Don't ❌
  function addUserService(db, user) {
    if (!db) {
      if (!db.isConnected()) {
        if (!user) {
          return db.insert("users", user);
        } else {
          throw new Error("No user");
        }
      } else {
        throw new Error("No database connection");
      }
    } else {
      throw new Error("No database");
    }
  }

  // Do ✅
  function addUserService(db, user) {
    if (!db) throw new Error("No database");
    if (!db.isConnected()) throw new Error("No database connection");
    if (!user) throw new Error("No user");

    return db.insert("users", user);
  }
  ```

- Favor object literals or maps over switch statements

  ```javascript
  // Don't ❌
  const getColorByStatus = (status) => {
    switch (status) {
      case "success":
        return "green";
      case "failure":
        return "red";
      case "warning":
        return "yellow";
      case "loading":
      default:
        return "blue";
    }
  };

  // Do ✅
  const statusColors = {
    success: "green",
    failure: "red",
    warning: "yellow",
    loading: "blue",
  };

  const getColorByStatus = (status) => statusColors[status] || "blue";
  ```

- Use optional chaining and nullish coalescing

  ```javascript
  const user = {
    email: "JDoe@example.com",
    billing: {
      iban: "...",
      swift: "...",
      address: {
        street: "Some Street Name",
        state: "CA",
      },
    },
  };

  // Don't ❌
  const email = (user && user.email) || "N/A";
  const street =
    (user &&
      user.billing &&
      user.billing.address &&
      user.billing.address.street) ||
    "N/A";
  const state =
    (user &&
      user.billing &&
      user.billing.address &&
      user.billing.address.state) ||
    "N/A";

  // Do ✅
  const email = user?.email ?? "N/A";
  const street = user?.billing?.address?.street ?? "N/A";
  const state = user?.billing?.address?.state ?? "N/A";
  ```

### 4. Concurrency

- Avoid callbacks
- Callbacks are messy and result in nested code. ES6 offers Promises which allow for chaining callbacks and thus result in cleaner code.
- Yet, ES6 also provides the “Async/Await” syntax as an arguably cleaner solution that imposes further linearity to code.

  ```javascript
  // Don't ❌
  getUser(function (err, user) {
    getProfile(user, function (err, profile) {
      getAccount(profile, function (err, account) {
        getReports(account, function (err, reports) {
          sendStatistics(reports, function (err) {
            console.error(err);
          });
        });
      });
    });
  });

  // Do ✅
  getUser()
    .then(getProfile)
    .then(getAccount)
    .then(getReports)
    .then(sendStatistics)
    .catch((err) => console.error(err));

  // or using Async/Await ✅✅

  async function sendUserStatistics() {
    try {
      const user = await getUser();
      const profile = await getProfile(user);
      const account = await getAccount(profile);
      const reports = await getReports(account);
      return sendStatistics(reports);
    } catch (e) {
      console.error(err);
    }
  }
  ```

### 5. Error Handling

- Handle thrown errors and rejected promises

  ```javascript
  // Don't ❌
  try {
    // Possible erronous code
  } catch (e) {
    console.log(e);
  }

  // Do ✅
  try {
    // Possible erronous code
  } catch (e) {
    // Follow the most applicable (or all):
    // 1- More suitable than console.log
    console.error(e);

    // 2- Notify user if applicable
    alertUserOfError(e);

    // 3- Report to server
    reportErrorToServer(e);

    // 4- Use a custom error handler
    throw new CustomError(e);
  }
  ```

### 6. Comments

- Only comment business logic

  ```javascript
  // Don't ❌
  function generateHash(str) {
    // Hash variable
    let hash = 0;

    // Get the length of the string
    let length = str.length;

    // If the string is empty return
    if (!length) {
      return hash;
    }

    // Loop through every character in the string
    for (let i = 0; i < length; i++) {
      // Get character code.
      const char = str.charCodeAt(i);

      // Make the hash
      hash = (hash << 5) - hash + char;

      // Convert to 32-bit integer
      hash &= hash;
    }
  }

  // Do ✅
  function generateHash(str) {
    let hash = 0;
    let length = str.length;
    if (!length) {
      return hash;
    }

    for (let i = 0; i < length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  ```

- Make use of version control
- There is absolutely no reason to keep commented code or journal comments, version control is already there to handle this.

  ```javascript
  // Don't ❌
  /**
   * 2021-7-21: Fixed corner case
   * 2021-7-15: Improved performance
   * 2021-7-10: Handled mutliple user types
   */
  function generateCanonicalLink(user) {
    // const session = getUserSession(user)
    const session = user.getSession();
    // ...
  }

  // Do ✅
  function generateCanonicalLink(user) {
    const session = user.getSession();
    // ...
  }
  ```

- Document when possible
- Documentation helps increase code quality and reliability. It serves as a user manual for your codebase in which anyone understands all the aspects of your code.
  ```javascript
  /**
   * Returns x raised to the n-th power.
   *
   * @param {number} x The number to raise.
   * @param {number} n The power, should be a natural number.
   * @return {number} x raised to the n-th power.
   */
  function pow(x, n) {
    // ...
  }
  ```

**[⬆ back to top](#list-of-contents)**

</br>

---

## [Worst JavaScript practices that degrade code quality](https://tech.groww.in/worst-javascript-practices-that-degrade-code-quality-c21e068f0212) <span id="content-3"><span>

### Still using var ?

- When you declare a var keyword its scope is not limited to the block it is inside. It is accessible anywhere outside the block as well. It is a function scoped keyword.

### Using un-descriptive names

- It's clear what our variables mean. Hence, use descriptive variable names.

### Using ‘==’ instead of ‘===’

- And as a matter of fact, the less magic you have in your code, the better it is.

### Lacking knowledge of DRY principle in Coding

- Pretty self-explanatory, eh?

### Not handling errors in API calls

- Handling Errors makes your app, less prone to unwanted situations or pages.

### Not understanding Arrow vs Normal functions

- Arrow functions don’t have their own context.
- Arrow functions are not valid constructors. Believe it or not, regular functions are “constructible”. Meaning they can be called with the new keyword and return a new instance of that function.
- They don't allow Duplicate Argument Names. This is acceptable for regular functions in a non-strict mode. However, this can’t happen with arrow functions, regardless of how strict you want to be.

**[⬆ back to top](#list-of-contents)**

</br>

---

## References:

- https://javascript.plainenglish.io/javascript-clean-code-best-practices-461c24c53cae
- https://medium.com/geekculture/writing-clean-javascript-es6-edition-834e83abc746
- https://tech.groww.in/worst-javascript-practices-that-degrade-code-quality-c21e068f0212
