import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const STORAGE_KEY = 'todomvc'
// const localStore = window.localStorage
// localStorage.getItem('todomvc') ? '' : localStorage.setItem('todomvc')

export default new Vuex.Store({
  state: {
    todos: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  },
  mutations: {
    addTodo(state, payload) {
      state.todos.push(payload)
      this.commit('save', {
        todos: state.todos,
      })
    },
    delTodo(state, { index }) {
      state.todos.splice(index, 1)
      this.commit('save', {
        todos: state.todos,
      })
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
      this.commit('save', {
        todos: state.todos,
      })
    },
    allDone(state, { completed }) {
      state.todos.forEach(todo => (todo.completed = completed))
      this.commit('save', {
        todos: state.todos,
      })
    },
    save(state, { todos }) {
      localStorage.setItem('todomvc', JSON.stringify(todos))
    },
  },
})
