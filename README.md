# reactnd-redux-todos-goals

## Udacity React Nanodegree (Part 2)

This repository contains the learning material based in React's Nanodegree by Udacity.

This repository is based on the [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) by [Udacity](https://www.udacity.com/) module 2 **React & Redux**

Only exercises and sample files.

### Contents

- Managing State
- UI + Redux
- Redux Middleware
- Redux with React
- Asynchronous Redux
- React-Redux
- Real World Redux

### vanilla

Simple store created using only JS, no React and Redux used.

### with-redux

Same store as vanilla but using Redux (using from CDN).

### react-redux

Same store as the others, but using React for the UI.

### react-redux-async

Same as react-redux, but using a fake database (available [here](https://ui.dev/goals-todos-api/index.js)) and handling async requests to the store.

### react-redux-async-context

Same as react-redux-async, but added React Context to be able to use the store in other components without worrying to pass props (store data) to components.
It leverages the use o Context.Provider and Context.Consumer
