// LIBRARY CODE
// Store creation
function createStore (reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state
  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  // Responsible for updating the state in our store
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

// APP CODE
// Instead of using action types as strings, we can have a safer code using constants
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// ACTION CREATORS
function addTodoAction (todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodoAction (id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

function toggleTodoAction (id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

function removeGoalAction (id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}


// A function to control our todos - This function is a Reducer
// Since concat will return a new array with the added todo, we are not modifying the state directly
// So this is a pure function, as reducers should be
function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map(todo => todo.id !== action.id 
        ? todo 
        : Object.assign({}, todo, { complete: !todo.complete }))
    default:
      return state
  }
}

function goals (state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id)
    default:
      return state
  }
}

// This way we create the store and pass our todos reducer to it.
// This will only work for a store with a single reducer (todos reducer)
// For more reducers we have to use a root Reducer and combine the reducers
// const store = createStore(todos)

// We will use the app function to handle a 'center store' that handles more than one reducer.
// Instead of a single array like the todos, we use an object with our states.

function app (state = {}, action) {
  return {
    // todos: {},
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app)

// Example code for using createStore and subscribing to it.
// const store = createStore()
store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

// Using dispatch with the Action creators
store.dispatch(addTodoAction({
  id: 0,
  name: 'Learn Redux',
  complete: false
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Redux class 2',
  complete: false
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Redux class 3',
  complete: false
}))

store.dispatch(toggleTodoAction(0))
store.dispatch(toggleTodoAction(1))
store.dispatch(removeTodoAction(2))


store.dispatch(addGoalAction({
  id: 0,
  name: 'Do stuff'
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Learn Redux'
}))

store.dispatch(removeGoalAction(0))

// Using some actions before creating an action creator.
store.dispatch({
  type: ADD_GOAL,
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Lose 10 kg'
  }
})

store.dispatch({
  type: REMOVE_GOAL,
  id: 0
})


const unsubscribe = store.subscribe(() => {
  console.log('The store changed.')
})

unsubscribe()

// Simple test
// let state = [{ flavor: 'Chocolate', count: 36 }, { flavor: 'Vanilla', count: 210 }]

// function appReducer(state, action) {
//   if (!state) return []
  
//   if (action.type === 'DELETE_FLAVOR') {
//     return state.filter(iceCream => iceCream.flavor !== action.flavor)
//   }

//   return state
// }

// appReducer(state, { type: 'DELETE_FLAVOR', flavor: 'Vanilla' })