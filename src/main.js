import Vue from 'vue'
import Vuex from "vuex"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import createPersistedState from "vuex-persistedstate";

import './scss/style.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
});

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')