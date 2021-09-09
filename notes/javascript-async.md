# React Design Patterns

</br>

## List of Contents:
### 1. [JavaScript Async/Await Tutorial – Learn Callbacks, Promises, and Async/Await in JS by Making Ice Cream](#content-1)


</br>

---

## Contents

## [JavaScript Async/Await Tutorial – Learn Callbacks, Promises, and Async/Await in JS by Making Ice Cream](https://www.freecodecamp.org/news/javascript-async-await-tutorial-learn-callbacks-promises-async-await-by-making-icecream/) <span id="content-1"><span>


### What is Asynchronous JavaScript?
- The theory of async JavaScript helps you break down big complex projects into smaller tasks.


### What is a Synchronous System?
- In a synchronous system, tasks are completed one after another.
- Well, JavaScript is by default Synchronous [single threaded]. Think about it like this – one thread means one hand with which to do stuff.


### What is an Asynchronous System?
- Here, imagine that for 10 tasks, you have 10 hands. So, each hand can do each task independently and at the same time.
  

### To Summarize Synchronous vs Asynchronous JS
- Synchronous system, three images are in the same lane. One can't overtake the other. The race is finished one by one. If image number 2 stops, the following image stops.
  ![Synchronous](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w1r9y4ghhq0t8wjb1u9h.png)
- Asynchronous system, the three images are in different lanes. They'll finish the race on their own pace. Nobody stops for anybody.
  ![Asynchronous](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ehknx5shc4orh32s0ktk.png)


### Synchronous Code Example
- Example:
  ```javascript
  console.log(" I ");

  console.log(" eat ");

  console.log(" Ice Cream ");
  ```


### Asynchronous code example
- Example:
  ```javascript
  console.log("I");

  // This will be shown after 2 seconds

  setTimeout(()=>{
    console.log("eat");
  },2000)

  console.log("Ice Cream")
  ```

### What are Callbacks in JavaScript?
- When you nest a function inside another function as an argument, that's called a callback.
  ![Callback Illustrated](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uz3pl56lmoc2pq7wzi2s.png)
  

### Why do we use callbacks?
- When doing a complex task, we break that task down into smaller steps. To help us establish a relationship between these steps according to time (optional) and order, we use callbacks.
- At the same time, if a previous step is not completed, we can't move on to the next step.


### Callback hell
- Example:
  ```javascript
  let production = () =>{

    setTimeout(()=>{
      console.log("production has started")
      setTimeout(()=>{
        console.log("The fruit has been chopped")
        setTimeout(()=>{
          console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} Added`)
          setTimeout(()=>{
            console.log("start the machine")
            setTimeout(()=>{
              console.log(`Ice cream placed on ${stocks.holder[1]}`)
              setTimeout(()=>{
                console.log(`${stocks.toppings[0]} as toppings`)
                setTimeout(()=>{
                  console.log("serve Ice cream")
                },2000)
              },3000)
            },2000)
          },1000)
        },1000)
      },2000)
    },0000)

  };
  ```

### How to Use Promises to Escape Callback Hell
- Promises were invented to solve the problem of callback hell and to better handle our tasks.


### Relationship between time and work
- Example:
  ```javascript
  let order = ( time, work ) => {

    return new Promise( ( resolve, reject )=>{

      if( is_shop_open ){

        setTimeout(()=>{

           // work is 👇 getting done here
          resolve( work() )

          // Setting 👇 time here for 1 work
         }, time)

      }

      else{
        reject( console.log("Our shop is closed") )
      }

    })
  }

  // Set 👇 time here
  order( 2000, ()=>console.log(`${stocks.Fruits[0]} was selected`))
  //    pass a ☝️ function here to start working
  ```
- My example:
  ```javascript
  const isShopOpen = true
  const order = (time, work) => {
    return new Promise((resolve, reject) => {
      if (isShopOpen) {
        setTimeout(() => {
           work()
        }, time)
        return
      }
      
      reject(console.log('Our shop is closed'))
    })
  }

  order(2000, () => console.log('Ordering the ice cream'))
  ```

### Promise chaining
- Let me make it simpler: it's similar to giving instructions to someone. You tell someone to " First do this, then do that, then this other thing, then.., then.., then..." and so on.
- Example:
  ```javascript
  // step 1
  order(2000,()=>console.log(`${stocks.Fruits[0]} was selected`))

  // step 2
  .then(()=>{
    return order(0000,()=>console.log('production has started'))
  })

  // step 3
  .then(()=>{
    return order(2000, ()=>console.log("Fruit has been chopped"))
  })

  // step 4
  .then(()=>{
    return order(1000, ()=>console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} added`))
  })

  // step 5
  .then(()=>{
    return order(1000, ()=>console.log("start the machine"))
  })

  // step 6
  .then(()=>{
    return order(2000, ()=>console.log(`ice cream placed on ${stocks.holder[1]}`))
  })

  // step 7
  .then(()=>{
    return order(3000, ()=>console.log(`${stocks.toppings[0]} as toppings`))
  })

  // Step 8
  .then(()=>{
    return order(2000, ()=>console.log("Serve Ice Cream"))
  })
  ```
- My example:
  ```javascript
  const isShopOpen = true
  const order = (time, work) => {
    return new Promise((resolve, reject) => {
      if (isShopOpen) {
        setTimeout(() => {
           resolve(work())
        }, time)
        return
      }
      
      reject(console.log('Our shop is closed'))
    })
  }

  order(2000, () => console.log('Ordering the ice cream'))
    .then(() => {
    return order(1000, () => console.log('Produce the ice cream'))
  }).then(() => {
    return order(2000, () => console.log('Ice cream is ready'))
  }).finally(() => {
    console.log('Enjoy your ice cream')
  })
  ```

### Error handling
- A small reminder here:
  - `.then` works when a promise is resolved
  - `.catch` works when a promise is rejected
- My example:
  ```javascript
  const isShopOpen = false
  const order = (time, work) => {
    return new Promise((resolve, reject) => {
      if (isShopOpen) {
        setTimeout(() => {
           resolve(work())
        }, time)
        return
      }
      
      reject(console.log('Our shop is closed'))
    })
  }

  order(2000, () => console.log('Ordering the ice cream'))
    .then(() => {
    return order(1000, () => console.log('Produce the ice cream'))
  }).catch(() => {
    console.log('Customer is leaving')
  }).finally(() => {
    console.log('Please leave!')
  })
  ```

### How to use the .finally() handler
- There's something called the finally handler which works regardless of whether our promise was resolved or rejected.


### How Does Async / Await Work in JavaScript?
- This is supposed to be the better way to write promises and it helps us keep our code simple and clean.
- All you have to do is write the word async before any regular function and it becomes a promise.


### Promises vs Async/Await in JavaScript
- Before async/await, to make a promise we wrote this:
  ```javascript
  function order(){
     return new Promise( (resolve, reject) =>{

      // Write code here
     } )
  }
  ```
- Now using async/await, we write one like this:
  ```javascript
  //👇 the magical keyword
   async function order() {
      // Write code here
   }
  ```

### How to use the Try and Catch keywords
- We use the try keyword to run our code while we use catch to catch our errors. 
- Resolve and reject example:
  ```javascript
  function kitchen(){

    return new Promise ((resolve, reject)=>{
      if(true){
         resolve("promise is fulfilled")
      }

      else{
          reject("error caught here")
      }
    })
  }

  kitchen()  // run the code
  .then()    // next step
  .then()    // next step
  .catch()   // error caught here
  .finally() // end of the promise [optional]
  ```
- Try catch example:
  ```javascript
  //👇 Magical keyword
  async function kitchen(){

     try{
  // Let's create a fake problem      
        await abc;
     }

     catch(error){
        console.log("abc does not exist", error)
     }

     finally{
        console.log("Runs code anyways")
     }
  }

  kitchen()  // run the code
  ```


### How to Use JavaScript's Await Keyword
- The keyword await makes JavaScript wait until a promise settles and returns its result.
- Example:
  ```javascript
  function toppings_choice (){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{

        resolve( console.log("which topping would you love?") )

      },3000)
    })
  }
  ```
  ```javascript
  async function kitchen(){

    console.log("A")
    console.log("B")
    console.log("C")
    
    await toppings_choice()
    
    console.log("D")
    console.log("E")

  }

  // Trigger the function

  kitchen();
  console.log("doing the dishes")
  console.log("cleaning the tables")
  console.log("taking orders")
  ```
- When using Async/ Await, you can also use the .then, .catch, and .finally  handlers as well which are a core part of promises.
- My example:
  ```javascript
  const makePromise = (callback) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 1000)
        if (randomNumber % 2 === 0) {
          resolve(callback())

          return
        }

        reject(new Error('You are rejected'))
      }, 2000)
    })
  }

  const asyncFunction = async () => {
    try {
      console.log('1')
      console.log('2')
      await makePromise(() => console.log('This is async function'))
      console.log('3')
      console.log('4')
    } catch(error) {
      console.log(error.toString())
      return error
    }
  }

  asyncFunction()
  console.log('something is here')
  console.log('another thing is here')
  ```



**[⬆ back to top](#list-of-contents)**

</br>

---

## References:
- https://www.freecodecamp.org/news/javascript-async-await-tutorial-learn-callbacks-promises-async-await-by-making-icecream/