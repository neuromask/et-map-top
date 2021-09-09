import Vue from 'vue'
import VueGtag from "vue-gtag";
import Vuex from "vuex"
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMobileDetection from "vue-mobile-detection";


// Components and views
import Locations from '@/views/Locations.vue'
import AppNavbar from '@//components/AppNavbar.vue'
import Top from '@/views/Top.vue'
import Help from '@/views/Help.vue'
import Admin from '@/views/Admin.vue'
import Login from '@/components/Login.vue'
import NotFound from '@/components/NotFound.vue'


import './scss/style.scss'

Vue.use(VueGtag, {
  config: { id: "G-H7BDVQX6FQ" },
  params: {
    send_page_view: true
  }
}, router);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('app-navbar', AppNavbar)
Vue.component('app-login', Login)
Vue.use(VueMobileDetection);



import axios from 'axios';

const store = new Vuex.Store(
  {
      state: {
          authenticated: true
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
      path: '/help',
      name: 'help',
      component: Help,
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
          axios
          .get('https://etmap.nuforms.com/user')
          .then(response => {
              if (response.status == '200') {
                  this.$store.commit("setAuthentication", true);
                  next();
              } else {
                next(false);
              }
          });
        } else {
            next();
        }
      }
    }
  ]
});



new Vue({
  data() {
    return {
      BACKEND_BASE: 'https://etmap.nuforms.com',
    }
  },
  router,
  store: store,
  render: (h) => h(App)
}).$mount('#app')