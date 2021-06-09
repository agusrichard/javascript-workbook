# Best Practices in JavaScript in General

## [JavaScript Best Practices](https://www.w3schools.com/js/js_best_practices.asp)

### 1. Avoid global variables
Global variables and functions can be overwritten by other scripts. One of the best way by using closure.

### 2. Always Declare Local Variables
It's better for use to declare variables locally.

### 3. Declarations on Top
Put all declarations at the top of the script or function.


## [Javascript BEST PRACTICES PART 1](https://www.thinkful.com/learn/javascript-best-practices-1/)

### Make it understandable

Bad variable names:

```
x1 fe2 xbqne
```

Also bad variable names:

```
incrementerForMainLoopWhichSpansFromTenToTwenty
}
createNewMemberIfAgeOverTwentyOneAndMoonIsFull
```

Avoid describing a value with your variable or function name.

Might not make sense in some countries:

```
isOverEighteen()
```
Works everywhere:

```
isLegalAge()
```

This is extremely weird example, lol.


### Avoid globals

Because we'll be faced by the danger that our code would get overwritten. The solution is by using closures and module pattern.


Problem: all variables are global and can be accessed; access is not contained, anything in the page can overwrite what you do.

```javascript
var current = null;
var labels = {
   'home':'home',
   'articles':'articles',
   'contact':'contact'
};
function init(){
};
function show(){
   current = 1;
};
function hide(){
   show();
};
```

Problem: Repetition of module name leads to huge code and is annoying.

```javascript
demo = {
   current:null,
   labels:{
      'home':'home',
      'articles':'articles',
      'contact':'contact'
   },
   init:function(){
   },
   show:function(){
      demo.current = 1;
   },
   hide:function(){
      demo.show();
   }
}
```

Problem: Repetition of module name, different syntax for inner functions.

```javascript
module = function(){
   var labels = {
      'home':'home',
      'articles':'articles',
      'contact':'contact'
   };
   return {
      current:null,
      init:function(){
      },
      show:function(){
         module.current = 1;
      },
      hide:function(){
         module.show();
      }
   }
}();
```

Revealing Module Pattern: Keep consistent syntax and mix and match what to make global.

```javascript
module = function(){
   var current = null;
   var labels = {
      'home':'home',
      'articles':'articles',
      'contact':'contact'
   };
   var init = function(){
   };
   var show = function(){
      current = 1;
   };
   var hide = function(){
      show();
   }
   return{init:init, show:show, current:current}
}();
module.init();
```

### Stick to a Strict Coding Style

Browsers are very forgiving JavaScript parsers. However, lax coding style will hurt you when you shift to another environment or hand over to another developer. Valid code is secure code.

### Comment as Much as Needed but Not More

> “Good code explains itself” is an arrogant myth.

We can comment on things we only need, but don't tell our life story there.

Avoid using the line comment //. /* */ is much safer to use because it doesn’t cause errors when the line break is removed.

### Avoid Mixing with Other Technologies

Bad
```javascript
var f = document.getElementById('mainform');
var inputs = f.getElementsByTagName('input');
for(var i=0,j=inputs.length;i<j;i++){
   if(inputs[i].className === 'mandatory' && inputs.value === ''){
      inputs[i].style.borderColor = '#f00';
      inputs[i].style.borderStyle = 'solid';
      inputs[i].style.borderWidth = '1px';
   }
}
```

Good
```javascript
var f = document.getElementById('mainform');
var inputs = f.getElementsByTagName('input');
for(var i=0,j=inputs.length;i<j;i++){
   if(inputs[i].className === 'mandatory' && inputs.value === ''){
      inputs[i].className+=' error';
   }
}
```

The reason behind this is when we want to change the general style but if we specify the style like in the bad practice, then we have to change all things. But if we use the good way then we just have to change the style on the css style definition.

### Use Shortcut Notations

```javascript
// not so good
var lunch = new Array();
lunch[0]='Dosa';
lunch[1]='Roti';
lunch[2]='Rice';
lunch[3]='what the heck is this?';

// better
var lunch = [
   'Dosa',
   'Roti',
   'Rice',
   'what the heck is this?'
];

// not so good
if(v){
   var x = v;
} else {
   var x =10;
}

// var x = v || 10;
```

### Modularize

It is tempting and easy to write one function that does everything. However, as you extend the functionality you will find that you do the same things in several functions.

To prevent that, make sure to write smaller, generic helper functions that fulfill one specific task rather than catch-all methods.

At a later stage you can also expose these functions when using the revealing module pattern to create an API to extend the main functionality.

### Enhance Progressively

Avoid creating a lot of JavaScript dependent code.

### Allow for Configuration and Translation

Everything that is likely to change in your code should not be scattered throughout your code.

## References:
- https://www.w3schools.com/js/js_best_practices.asp
- https://www.thinkful.com/learn/javascript-best-practices-1/