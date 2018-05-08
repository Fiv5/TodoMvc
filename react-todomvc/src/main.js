import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todoApp from './reducers'
import * as ACTIONS from './actions'

import './index.css'

const initialState = JSON.parse(
  window.localStorage.getItem('react-todomvc')
) || {
  visibilityFilter: { filter: ACTIONS.SHOW_ALL, nowIndex: 0 },
  todos: [],
}

let store = createStore(todoApp, initialState)
// bind data to localStorage
const bindDataToLocalStorage = () => {
  const data = store.getState()
  window.localStorage.setItem('react-todomvc', JSON.stringify(data))
}
store.subscribe(bindDataToLocalStorage)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
