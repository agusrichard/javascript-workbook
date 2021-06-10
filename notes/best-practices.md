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

## [Javascript BEST PRACTICES PART 2](https://www.thinkful.com/learn/javascript-best-practices-2/)

### Avoid Heavy Nesting

Now, do a comparative check between these two:

```javascript
// One
function renderProfiles(o){
   var out = document.getElementById('profiles');
   for(var i=0;i<o.members.length;i++){
      var ul = document.createElement('ul');
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(o.members[i].name));
      var nestedul = document.createElement('ul');
      for(var j=0;j<o.members[i].data.length;j++){
         var datali = document.createElement('li');
         datali.appendChild(
            document.createTextNode(
               o.members[i].data[j].label + ' ' +
               o.members[i].data[j].value
            )
         );
         nestedul.appendChild(detali);
      }
      li.appendChild(nestedul);
   }
   out.appendChild(ul);
}

// Two
function renderProfiles(o){
   var out = document.getElementById('profiles');
   for(var i=0;i<o.members.length;i++){
      var ul = document.createElement('ul');
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(data.members[i].name));
      li.appendChild(addMemberData(o.members[i]));
   }
   out.appendChild(ul);
}
function addMemberData(member){
   var ul = document.createElement('ul');
   for(var i=0;i<member.data.length;i++){
      var li = document.createElement('li');
      li.appendChild(
         document.createTextNode(
            member.data[i].label + ' ' +
            member.data[i].value
         )
      );
   }
   ul.appendChild(li);
   return ul;
}
```

Why the first one is better than the second one? Because after several level of nesting, we will lose control of our code and it gets harder for people to read our code. Because of that, it's better for us to refactor our code and prevent heavy nesting.


### Optimize Loops

Don’t make JavaScript read the length of an array at every iteration of a for loop. Store the length value in a different variable.

```javascript
// Not good
var names = ['George',
'Ringo',
'Paul',
'John'];
for(var i=0;i<names.length;i++){
   doSomethingWith(names[i]);
}

// Better
var names = ['George',
'Ringo',
'Paul',
'John'];
for(var i=0,j=names.length;i<j;i++){
   doSomethingWith(names[i]);
}
```

You can create the DOM nodes in the loop but avoid inserting them to the document. Because inserting a DOM would be an expensive operation.

### Keep DOM Access to a Minimum

If you can avoid it, don’t access the DOM.

Reason: It’s slow and there are all kinds of browser issues with constant access to and changes in the DOM.

Solution: Write or use a helper method that batch-converts a dataset to HTML.

Seed the dataset with as much as you can and then call the method to render all out in one go.

### Don’t Trust Any Data
Good code does not trust any data that comes in.
- Don’t believe the HTML document
- Don’t trust that data reaches your function is of the right format.
- Don’t expect elements in the DOM to be available.
- Never ever use JavaScript to protect something.

### Add Functionality with Javascript Not Content

It is not convenient to create using the DOM, it’s flasky to use innerHTML (IE’s Operation Aborted error), and it’s hard to keep track of the quality of the HTML you produce.

### Development Code is Not Live Code

- Collate, minify and optimize your code in a build process.
- Don’t optimize prematurely and punish your fellow developers and those who have to take over from them.
- If we cut down on the time spent coding we have more time to perfect the conversion to machine code.

## [50 Javascript Best Practice Rules to Write Better Code](https://beforesemicolon.medium.com/50-javascript-best-practice-rules-to-write-better-code-86ce731311d7)

### Always “use strict” On

It will make sure you get errors that would happen silently if don't include it.

### Use Function expressions instead of Function Declarations

Function declarations are hoisted and although it can be useful sometimes, avoid them as they introduce weird behavior to the code and it is not always obvious what's happening.

![Function expressions are better](https://miro.medium.com/max/700/1*1zhxPNe2QfRI68V5y1C5qw.png)


### Stop using “var”!

Declaration using var is hoister. Pretty sure this is a weird thing in general usage.

### Use “const” and immutability as much as possible

Prefer immutability as much as possible. Constantly changing data and passing it around can make it hard to track bugs and the changes itself. Work on data copies and avoid side effects.

### Prefer Pure Functions

Don't mutate data inplace. It's better to return the processed copy.

![Prefer pure functions](https://miro.medium.com/max/2400/1*wgTleRXpe9iat9NRMxO9aQ.png)


#### Prefer Class over Constructor Functions

Although the constructor function allows you to do some very nice stuff, if you find yourself reaching out for its prototype is a sign you need to use “class” which are supported pretty much anywhere. It is cleaner and something people are more likely to understand.

Disclaimer: The key point is, if we care about the type or the prototype of some object, it's better for us to use class to create an instance/object. But if we don't care about its type or its prototype, then just by using constructor functions it is fine.

### Use “destructuring”

Destructuring is elegant and makes it more obvious what you need from array and objects.

![Use destructuring](https://miro.medium.com/max/700/1*bV1cy6OnWQbIhSy3JbJ4fw.png)

But using it to destructure a deeply nester object, that would be not advisable.

### Only work with data you need

Like the above examples, destructuring is a good way to extract the data you need to do the job but, also make it a habit to only call methods and functions with the things they need. This also goes to the data coming from the API. Extract and cleanup only the data you need before storing or doing anything to it.

### Always use “===”

This is certainly obvious. Because this operator checks type and value.

### Avoid Global Variables

Avoiding creating things in global objects unless you are creating a library/framework. Global property names may collide with third parties or something a colleague also introduced and are hard to debug.

### Wrap loose declarations in blocks

![Wrap loose declarations in blocks](https://miro.medium.com/max/700/1*_f-JL2Vnv4BycXmNgolbkg.png)

### Organize your declarations

Be consistent with the way you declare things. Put all your declarations on top starting with the constants down to the variables. Make constants all uppercase to indicate they are constants which will prevent devs from trying to change them.

### Don't initialize things with “undefined”

Something is “undefined” when it lacks value. Let’s agree that assigning “no value” as a “value” for something is a pretty weird concept right? Since Javascript already makes things “undefined” how can you tell whether something is undefined because of you or Javascript? It makes it hard to debug why things are “undefined” so prefer setting things to “null” instead.

### Always initialize your declarations

For the same reason, you should not give “undefined” as a value to declarations, you should not leave them without a value because they are “undefined” by default.

I guess a variable declaration is not a good thing in javascript. It's better to instantiate things right away.

### Lint your code and have a consistent style

Linting your code is the best way to ensure a consistent look and feel of your code and make sure people don't do weird things to it as well. It puts everyone on the same page.

### Use Typescript

Typescript can help you a lot in delivering better code. It will need some getting used to if you never tried a type system but it pays off in the long run.

Agree. Loosely-typed languages have their own advantages, but in this case strictly-typed language can save us from the headache of debugging. 

### Functions and methods should do one thing only

It is easy to get carried away with adding extra stuff to function while you are at it and the best way to find out whether a function is doing too much is by looking at its name. The name should tell what the function does and anything unrelated should go.

![Functions and methods should do one thing only](https://miro.medium.com/max/700/1*ADfOEvRXxKEUUdt2_IsSjw.png)

### Don’t be lazy when naming things
Always put some effort into naming things. If it is hard to name you probably gave it extra responsibility or do not understand what it is. Give it at least a 3 letter name with meaning.

### Avoid unnecessary declarations
Some declaration can be avoided altogether so only declare when it is strictly necessary. Too many declarations may hint at a lack of proper code design or declaration consideration

### Use default values when posible
Having defaults is more elegant than throwing errors because something was not provided.

### Always have a default case for switch statements
Don't leave your switch statements without a default case because something can go wrong and you want to make sure you catch it.

### Never use “eval”
Never! It is not necessary.


### Avoid the “new” keyword
Except for class and constructor functions instancing, you should never use the “new” keyword for anything else.

![Avoid the “new” keyword](https://miro.medium.com/max/700/1*4CEOy1Ou4B_qz_ez3w2uuQ.png)

### Add meaningful comments for nonobvious things
Only add comments when you did something not common, weird, or requires context to be understood. Also, add comments to things that are a hack or may require improvements/fixing later on so the next person knows why.

### Keep ternaries simple
Worst case scenario you have two nested ternaries. Anything longer should be an if statement or switch for readability and easy to debug reasons.

### Simplify with optional chaining
Get rid of those nested checks and use the “?” Operator.

![Simplify with optional chaining](https://miro.medium.com/max/700/1*fRujg1A8NMtNyppRIVjXdQ.png)


### Prefer promises over callbacks
Callback can be turned into a promise.

![Prefer promises over callbacks](https://miro.medium.com/max/700/1*ouwklAgv2YtimgORvh_l4w.png)

### For loops > .forEach sometimes
Don't create another process for the sake of turning thing to an array so we can do forEach to it. Sometimes it is better to use for loops.

### “for…in” and “for…of”
The for-in and for-of loops are very powerful ways to loop. The “for-of” loop lets you go over the values of the array, strings, Map, Set, etc. No need to change something into an array to use .forEach. I would avoid the “for-in” for looping as it is the slowest one and iterates over prototype keys.

### Optimize for loops?
For loops are already optimized by the compiler so no need for that kinda of optimization.

### Always “try…catch” JSON methods
Don't trust things passed to JSON methods “.stringify” and “.parse”. Try to catch them to make sure they don't fail and break your code.

### Prefer template strings
Using template strings provides us with a flexible interface.

### Avoid nesting or chaining loops
A decent asessment is needed to make sure we are not trapped to use nesting loops. If we can avoid it or make it simple, then it's certainly a better option.

### Avoid Weird Unreadable hacks
They are all over the internet because people find them “cool”. They are usually weird, non-conventional, and non-obvious when you look at them. It is always best to follow the guidelines of the tool you are using to ensure proper performance. Hacking should be that last alternative.

### Prefer the “rest” operator over “arguments”
The “rest” operator will work with arrow functions where “arguments” are not available. Stick to one way to access your function arguments.

### Prefer “globalThis” for global access
Let the Javascript handle the rest and make sure that your code will work whether it is inside a Web Worker or Backend Node.

### Understand Javascript but Build with Libraries and Frameworks
I recommend investing time in understanding the Javascript language itself but build with powerful tools like React and Angular to avoid common mistakes. Make sure you follow their guidelines since these tools already guard for common mistakes and employ best practices.

### Readable > Performance unless you need Performance

Be clever is good, but we have to make sure that this first point we have to make is about clarity and readibility.

### Be careful with “Truthy” and “Falsy” checks

Don’t rely on the “truthy” and “falsy” checks 

![Be careful with “Truthy” and “Falsy” checks](https://miro.medium.com/max/700/1*xGaSPFjqx9Ta7g9ohjE7Iw.png)

### Prefer Ternary over logical “||” and “&&” checks

![Prefer Ternary over logical “||” and “&&” checks](https://miro.medium.com/max/700/1*t9u1K8dIRnYzlDDnpwQmqw.png)

### Watch out for “undefined” and “null” with the “??” operator

The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

```javascript
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
```

### Be careful with automatic type conversions

![Be careful with automatic type conversions](https://miro.medium.com/max/700/1*kQ4yz_swMDXuBYt0yxe5ug.png)

### Never trust data you don't create
Whenever you are dealing with data coming from a user or from an API you don't know, make sure it is of the right type and in a format that you can work with before you do any operation on it.

### Use regex when extracting and looking for things in Strings

Using regex can give us a lot control over the string we want to process. But as you might know, some regex pattern is hard to read, then it's better to give some comment regarding the regex pattern we use.

### Avoid repeating yourself with utilities
Always turn things you do repeatedly into small generic functions that you can reuse later on. As a developer, you should not be repeating things and small functions make them easy to test and reuse.

### Don’t take advantage of weird Javascript “features”

![Don’t take advantage of weird Javascript “features”](https://miro.medium.com/max/700/1*ZygonD__RBPqbhDZKwqCXQ.png)


### Add Unit Tests
This is the thing that a developer usually forget how important this thing is. By adding using tests we can make sure that our code does the right thing.

## References:
- https://www.w3schools.com/js/js_best_practices.asp
- https://www.thinkful.com/learn/javascript-best-practices-1/
- https://www.thinkful.com/learn/javascript-best-practices-2/Avoid-Heavy-Nesting#Build-on-the-Shoulders-of-Giants
- https://beforesemicolon.medium.com/50-javascript-best-practice-rules-to-write-better-code-86ce731311d7