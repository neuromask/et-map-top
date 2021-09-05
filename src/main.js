import Vue from 'vue'
import Vuex from "vuex"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// Components and views
import AppNavbar from '@//components/AppNavbar.vue'
import Locations from '@/views/Locations.vue'
import Top from '@/views/Top.vue'
import Admin from '@/views/Admin.vue'
import Login from '@/components/Login.vue'
import NotFound from '@/components/NotFound.vue'


import './scss/style.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('app-navbar', AppNavbar)

const store = new Vuex.Store(
  {
      state: {
          authenticated: false
      },
      mutations: {
          setAuthentication(state, status) {
              state.authenticated = status;
          }
      }
  }
);

const router = new VueRouter({
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }, {
      path: '/',
      name: 'locations',
      component: Locations,
      meta: {
        auth: false
      }
    }, {
      path: '/top',
      name: 'top',
      component: Top,
      meta: {
        auth: false
      }
    }, {
      path: '/access',
      redirect: {
          name: "login"
      }
    }, {
      path: "/login",
      name: "login",
      component: Login
    }, {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        console.log(store.state.authenticated);
        if(store.state.authenticated == false) {
            next(false);
        } else {
            next();
        }
      }
    }
  ]
});

new Vue({
  router,
  store: store,
  render: (h) => h(App)
}).$mount('#app')