import * as ACTIONS from './actions'

const todoApp = (state, action) => {
  return {
    todos: todosReducers(state.todos, action),
    visibilityFilter: visibilityReducers(state.visibilityFilter, action),
  }
}

const todosReducers = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, action.payload]
    case ACTIONS.DEL_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    case ACTIONS.TOGGLE_ALL:
      return todos.map(todo => ({ ...todo, completed: action.payload.value }))
    case ACTIONS.TOGGLE_TODO:
      return todos.map(
        todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload.value }
            : todo
      )
    case ACTIONS.EDIT_TODO:
      return todos.map(
        todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
      )
    case ACTIONS.CLEAR_COMPLETED:
      return todos.filter(todo => !todo.completed)
    default:
      return todos
  }
}

const visibilityReducers = (visibilityFilter, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_FILTER:
      return {
        ...visibilityFilter,
        filter: action.payload.filter,
        nowIndex: action.payload.index,
      }
    default:
      return visibilityFilter
  }
}

export default todoApp
