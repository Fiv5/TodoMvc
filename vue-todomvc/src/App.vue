<template>
  <div id="app">
      <todo-main></todo-main>
  </div>
</template>

<script>
import TodoMain from './components/main'
export default {
  name: 'app',
  components: {
    TodoMain,
  },
}
</script>
