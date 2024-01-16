---
title: "Redux and the onion model: a simple guidance"
date: "2020-05-20T23:39:33.169Z"
description: "Fundamental knowledge of redux and an simple but educational example for onion model"
---

## The prerequisite


### 1. Javascript

### 2. Compose

> Composes functions from right to left.

Combining functions, connecting functions in series for execution. Just like domino, the first function is pushed down, and other functions are also executed.

First we look at a simple example.

```js
// Equation: f(x) = (x + 100) * 2 - 100
const add = a => a + 100;
const multiple = m => m * 2;
const subtract = s => s - 100;

// Deeply nested function
subtract(multiple(add(200)));  //500
```

The execution result of the above example is: 500

Compose actually implements the concatenation of all functions through the reduce () method. The deep nested function mode is not directly used, which enhances the code readability.

```js
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

```
compose(subtract, multiple, add)(200);
```

### 3. Currying

> Currying is the technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single argument

Let the codes explain themselves:

```js
// Equation: f(x, y, z) = (x + 100) * y - z;

const fn = (x, y, z) => (x + 100) * y - z;
fn(200, 2, 100);

// Can be implemented as below 

const fn = function(x) { 
  return function(y) { 
    return function(z) { 
      return (x + 100) * y - z; 
    }
  } 
}


// The implementation of Currying uses a single 
// parameter anonymous function wrapped in 
// layers to implement the same function above

const fn = x => y => z => (x + 100) * y - z;
fn(200)(2)(100);  //500
```

* Currying only accepts single parameter.

## Why dispatch needs middleware

```

 --------  callack   ----------  action
| Button | ------>  | Dispatch | ------           
 --------            ----------       |
                                      |
                                      |
 --------   state    ----------       |
|  View  | <------  |  Reducer | <-----           
 --------            ----------             
         
```

The above figure shows a simple synchronous data flow scenario in redux. After clicking the button, an action is dispatched in the callback. After the reducer receives the action, it updates the state and notifies the view to re-render. One-way data flow, it looks no problem. However, if you need to print every action information for debugging, you have to change the dispatch or reducer code to make it have the function of printing the log; for example, after clicking the button, you need to go to the server to request data first. In order to re-render the view, at this time we hope that the dispatch or reducer has the function of asynchronous request; for example, after asynchronously requesting the data, print a log, request the data again, print the log again, and render ...

In the face of various business needs, simply modifying the code of dispatch or reducer is obviously not universal. What we need is a combinable, freely pluggable plug-in mechanism. This redux draws lessons from onion model in  [koa](https://link.zhihu.com/?target=http%3A//koa.bootcss.com/) to solve the problem. Koa is a NodeJS framework for building web applications. 


## Source code analysis of “applyMiddleware”

The code of applyMiddleware function is short, but it is the most essence of Redux. It allows Redux to insert the side effects in the process of action transmission while maintaining "self-functional purity".

A piece of code is used for example before the diagram. We will understand applyMiddleware's onion model mechanism around this code:

```js
function M1(store) {
  return function(next) {
    return function(action) {
      // M1 side effect
      console.log('A middleware1 starts');
      next(action)
      console.log('B middleware1 ends');
    };
  };
}

function M2(store) {
  return function(next) {
    return function(action) {
      // M2 side effect
      console.log('C middleware2 starts');
      next(action)
      console.log('D middleware2 ends');
    };
  };
}

function M3(store) {
  return function(next) {
    return function(action) {
      // M3 side effect
      console.log('E middleware3 starts');
      next(action)
      console.log('F middleware3 ends');
    };
  };
}

function reducer(state, action) {
  if (action.type === 'MIDDLEWARE_TEST') {
    console.log('======= G =======');  
  }
  return {};
}

var store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(
    M1,
    M2,
    M3
  )
);

store.dispatch({ type: 'MIDDLEWARE_TEST' });
```

The onion model of the above code is as follows:

```
            --------------------------------------
            |            middleware1              |
            |    ----------------------------     |
            |    |       middleware2         |    |
            |    |    -------------------    |    |
            |    |    |  middleware3    |    |    |
            |    |    |                 |    |    |
          next next next  ———————————   |    |    |
dispatch  —————————————> |  reducer  | — Ending ->|
nextState <————————————— |     G     |  |    |    |
            | A  | C  | E ——————————— F |  D |  B |
            |    |    |                 |    |    |
            |    |    -------------------    |    |
            |    ----------------------------     |
            --------------------------------------

Sequence   A -> C -> E -> G -> F -> D -> B
          \---------------/   \----------/
                  ↓                ↓
            Update state       Ending process
```


We refer to each part of middleware that actually brings side effects (here side effects are good, all we need is side effects of middleware), called `M? Side effects`, and its function signature is `(action) => {}`.


For this sample code, the running process of the onion model of Redux middleware is:

The user dispatches action → action to pass the M1 side effects → print A → execute M1 next (this next points to M2 side effects) → print C → execute M2 next (this next points to M3 side effects) → print E → execute M3 next (this next Point to `store.dispatch`) → Return to M3 side effect printing F after execution completion → Return to M2 print E → Return to M1 side effect printing B-> dispatch execution is completed.

So the question is, how does the next of M1 M2 M3 bind?

Answer: Currying binding, the complete function signature of a middleware is `store => next => action {}`, but the last executed onion model only has action left, and the outer store and next go through Curry The corresponding function is bound, and then look at how next is bound.

```js
const store = createStore(...args)
let dispatch = store.dispatch
let chain = []
const middlewareAPI = {
    getState: store.getState,
    dispatch: (...args) => dispatch(...args)
}
chain = middlewares.map(middleware => middleware(middlewareAPI)) // bind {dispatch和getState}
dispatch = compose(...chain)(store.dispatch) // bind next
```

The key point is the two bingding sentences. Let ’s look at the first sentence:

```js
chain = middlewares.map(middleware => middleware(middlewareAPI)) // bind {dispatch和getState}
```

Why bind `getState`? Because middleware needs to get the current state at any time. Why should it get `dispatch`? Because there may be actions dispatching (such as redux-thunk) in the middleware, currying this map function binds `getState` and `dispatch`.

Next  `dispatch = compose(...chain)(store.dispatch) `. The function of compose is, from right to left, the return value on the right is passed in as a parameter on the left, wrapped in layers, as we discussed above.

It is equivalent to: 

```js
dispatch = MC1(MC2(MC3(store.dispatch)))

```

MC is the element in the chain, yes, this is another currying.

At this point, the truth is clear. Dispatch made a small contribution and did two things: 1 \. Binding next in each middleware. 2 \. An interface is exposed for receiving actions. 

## Detail

After compose, all the middleware is connected in series, but there is still a problem we need to dig. Every middleware can access the store, which is the variable in middlewareAPI, so you can get the dispatch method of the store. Is there a difference to use `store.dispatch()` instead of `next()`?

```js
// The wrong version

const middlewareAPI = { 
  getState: store.getState, 
  dispatch: store.dispatch 
}

// The correct version

const middlewareAPI = { 
  getState: store.getState, 
  dispatch: (...args) => dispatch(...args) 
}
```

If directly written as `store.dispatch`, then dispatch an action in a middleware (except the last one, the last middleware is the original `store.dispatch`), such as redux-thunk:

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
```

It is to intercept the action with the function type. If this actionCreator is a fuction to fetch online data then dispatch a new action accordingly and we use `store.dispatch` instead of `dispatch = MC1(MC2(MC3(store.dispatch)))`, then this action has gone through `store.dispatch` without any middleware decoration, which is obviously not acceptable. The flow can be demonstrated as below:

```
// The wrong version using store.dispatch

Sequence   A -> C -> E -> G -> F -> D -> B
                     |
                     ↓                
               dispatch action -> G


// The correct version using 
// dispatch = MC1(MC2(MC3(store.dispatch)))

Sequence   A -> C -> E -> G -> F -> D -> B
                     |
                     ↓                
               dispatch action -> A -> C -> E -> G ->...
```


## Reference

*   [https://zhuanlan.zhihu.com/p/20597452](https://zhuanlan.zhihu.com/p/20597452)

*   [https://github.com/kenberkeley/redux-simple-tutorial/blob/master/redux-advanced-tutorial.md](https://github.com/kenberkeley/redux-simple-tutorial/blob/master/redux-advanced-tutorial.md)

*   [https://juejin.im/post/5859edb98d6d810065c8f28a](https://juejin.im/post/5859edb98d6d810065c8f28a)
