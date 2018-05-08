<template>
  <div>
    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <input type="text" placeholder="What needs to be done?" class="new-todo" v-model="newTodo" @keyup.enter="addTodo" autofocus>
        </header>
        <section class="main" v-if="todos.length">
            <input type="checkbox" class="toggle-all" id="toggle-all" v-model="allDone">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list" :class="filters[nowIndex]">
                <li class="todo" :class="{completed:todo.completed, editing:todo === editedTodo}" v-for="todo of todos" :key="todo.id">
                    <div class="view">
                        <input type="checkbox" class="toggle" v-model="todo.completed">
                        <label @dblclick="editTodo(todo)">{{todo.title}}</label>
                        <button class="destroy" @click="delTodo(todo)"></button>
                    </div>
                    <input type="text" class="edit" v-edit-focus="todo === editedTodo" v-model="todo.title" @blur="editDone(todo)" @keyup.enter="editDone(todo)" @keyup.esc="cancelEdit(todo)">
                </li>
            </ul>
        </section>
        <footer class="footer" v-if="todos.length">
            <span class="todo-count">
                <strong>{{ activeTodo.length }} </strong> {{activeTodo.length === 1 ? 'item' : 'items'}} left
            </span>
            <ul class="filters">
                <li v-for="(filter, index) of filters" :key="filter" @click="handleFilterClick(index)"><a :class="[index === nowIndex ? 'selected' : '']">{{filter}}</a></li>
            </ul>
            <button class="clear-completed" v-if="completedTodos.length !== 0" @click="clearCompleted">
                Clear Completed
            </button>
        </footer>
    </section>
    <footer class="info">
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="#">吴哲卿</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'todo-main',
  data() {
    return {
      // todos: this.$store.state.todos,
      newTodo: '',
      checked: false,
      filters: ['All', 'Active', 'Completed'],
      nowIndex: 0,
      editedTodo: null,
    }
  },
  computed: {
    // todos 应作为一个state的计算属性获取， 如果直接放在data中， 当在store中进行对state的赋值操作
    // 如：state.todos = xxx  则会导致不是同一个对象引用而致使数据失去响应式
    ...mapState({
      todos: state => state.todos,
    }),
    ...mapGetters(['completedTodos', 'activeTodo', 'remaining']),
    // completedTodos() {
    //   return this.todos.filter(todo => todo.completed)
    // },
    // activeTodo() {
    //   return this.todos.filter(todo => !todo.completed)
    // },
    // remaining() {
    //   return this.activeTodo.length
    // },
    allDone: {
      get() {
        return this.remaining === 0
      },
      set(value) {
        this.$store.commit('allDone', {
          completed: value,
        })
      },
    },
  },
  mounted() {
    window.addEventListener('popstate', this.popStateListener)
    window.history.replaceState({ hash: window.location.hash }, null, '#/All')
  },
  methods: {
    addTodo() {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) return
      // console.log(this.todos.length + 1)
      this.$store.commit('addTodo', {
        title: value,
        completed: false,
        // id: this.todos.length + 1,
        id: Date.now(),
      })
      this.newTodo = ''
    },
    delTodo(todo) {
      const { id } = todo
      this.$store.commit('delTodo', {
        id,
      })
    },
    editTodo(todo) {
      this.editedTodo = todo
      this.cacheEdit = todo.title
    },
    cancelEdit(todo) {
      todo.title = this.cacheEdit
      this.editedTodo = null
    },
    editDone(todo) {
      todo.title.trim() ? null : this.delTodo(todo)
      this.editedTodo = null
    },
    clearCompleted() {
      this.$store.commit('clearCompleted')
      // console.log(this.$store.state.todos[0])
    },
    toggleFilter(idx) {
      this.nowIndex = idx
    },
    changeHashState(idx) {
      // 改变url的hash
      const state = this.filters[idx],
        hash = `#/${state}`
      window.history.pushState({ hash }, null, hash)
    },
    handleFilterClick(idx) {
      this.toggleFilter(idx)
      this.changeHashState(idx)
    },
    popStateListener(e) {
      if (e.state) {
        const { hash } = e.state
        const filterIdx = this.filters.findIndex(
          filter => filter === hash.slice(hash.indexOf('/') + 1)
        )
        this.toggleFilter(filterIdx)
      }
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(todos, oldTodos) {
        this.$store.commit('save')
      },
    },
  },
  directives: {
    'edit-focus'(el, binding) {
      if (binding.value) {
        el.focus()
      }
    },
  },
}
</script>

