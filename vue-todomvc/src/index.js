import Vue from 'vue'
import App from './App'
import store from './store'
import './index.css'

new Vue({
  store,
  render(h) {
    return h(App)
  },
}).$mount('#app')
