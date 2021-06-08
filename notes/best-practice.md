# Best Practices in JavaScript in General

## [JavaScript Best Practices](https://www.w3schools.com/js/js_best_practices.asp)

### 1. Avoid global variables
Global variables and functions can be overwritten by other scripts. One of the best way by using closure.

### 2. Always Declare Local Variables
It's better for use to declare variables locally.

### 3. Declarations on Top
Put all declarations at the top of the script or function.


## [Understanding Loose Typing in JavaScript](http://blog.jeremymartin.name/2008/03/understanding-loose-typing-in.html)


Loose typing means that variables are declared without a type. This is in contrast to strongly typed languages that require typed declarations.   

```
// in javascript
var a = 13

// in java
int a = 13
```

Variables in JavaScript are typed, but that type is determined internally

![Data types in JavaScript](https://image.bayimg.com/oajpbaabc.jpg)


### Type Coercion
```
7 + 7 + 7; // = 21  
7 + 7 + "7"; // = 147  
"7" + 7 + 7; // = 777 

1 == true; // = true  
1 === true; // = false  
  
7 == "7"; // = true  
7 === "7"; // = false;
```

For equality check, it's better for us to use '===' instead of '=='. Since with triple equal signs, we don't want to type coercion between two operands.

## [The Right Way](https://jstherightway.org/#getting-started)



## References:
- https://www.w3schools.com/js/js_best_practices.asp
- https://jstherightway.org/#getting-started