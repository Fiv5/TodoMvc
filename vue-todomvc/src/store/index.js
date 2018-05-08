import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const STORAGE_KEY = 'todomvc'
// const localStore = window.localStorage
// localStorage.getItem('todomvc') ? '' : localStorage.setItem('todomvc')
const saveItem = store => {
  store.subscribe((mutations, { todos }) => {
    localStorage.setItem('todomvc', JSON.stringify(todos))
  })
}
export default new Vuex.Store({
  state: {
    todos: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  },
  getters: {
    completedTodos({ todos }) {
      return todos.filter(todo => todo.completed)
    },
    activeTodo({ todos }) {
      return todos.filter(todo => !todo.completed)
    },
    remaining(_, { activeTodo }) {
      return activeTodo.length
    },
  },
  mutations: {
    addTodo(state, payload) {
      state.todos.push(payload)
    },
    delTodo(state, { id }) {
      state.todos = state.todos.filter(todo => todo.id !== id)
      // state.todos.splice(index, 1)
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    allDone(state, { completed }) {
      state.todos.forEach(todo => (todo.completed = completed))
    },
    // save item in localstorage
    save(state, payload) {
      // localStorage.setItem('todomvc', JSON.stringify(todos))
    },
  },
  plugins: [saveItem],
})
