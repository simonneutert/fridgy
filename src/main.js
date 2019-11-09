// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.config.devtools = true

Vue.component('v-icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    this.$store.commit('INITIALISE_STORE')
  }
})
Vue.router = router
