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

## 50 Javascript Best Practice Rules to Write Better Code

## References:
- https://www.w3schools.com/js/js_best_practices.asp
- https://www.thinkful.com/learn/javascript-best-practices-1/
- https://www.thinkful.com/learn/javascript-best-practices-2/Avoid-Heavy-Nesting#Build-on-the-Shoulders-of-Giants