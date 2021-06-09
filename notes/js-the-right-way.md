# JavaScript The Right Way

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


## [JavaScript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)


## References:
- https://jstherightway.org/#getting-started
- http://blog.jeremymartin.name/2008/03/understanding-loose-typing-in.html
- http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html