import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import VueGtag from "vue-gtag"
import Vuex from "vuex"
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueMobileDetection from "vue-mobile-detection"
// import {vueTelegramLogin} from "vue-telegram-login"
import AppNavbar from './components/AppNavbar.vue'
import TelegramLogin from "./components/TelegramLogin";
import axios from 'axios';

import './scss/style.scss'

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuex)
Vue.use(VueMobileDetection)
// Vue.component('vueTelegramLogin', vueTelegramLogin)
Vue.component('app-navbar', AppNavbar)
Vue.component('telegram-login', TelegramLogin)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

Vue.use(VueGtag, {
  config: { id: "G-H7BDVQX6FQ" }
}, router);

// intercept axios requests to add auth token
axios.interceptors.request.use((config) => {
  let jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers["Authorization"] = `Bearer ${jwt}`;
  }
  console.log(config);
  return config;
});

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

new Vue({
  data() {
    return {
      BACKEND_BASE: 'https://api.electrotallinn.ee',
      isLogged: false,
      user: {
        first_name: null,
        uin: null,
        photo_url: null,
        username: null,
      }
    }
  },
  methods: {
    loginTelegram(data) {
      this.user = {
        firstName: data.first_name,
        uin: data.id,
        photoUrl: data.photo_url,
        username: data.username
      };
      axios
        .post(this.$root.BACKEND_BASE + '/login', data)
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('jwt', response.data.token);

          // TODO maybe not need this?
          this.isLogged = true;

          axios
            .get(this.$root.BACKEND_BASE + '/user')
            .then(r => {
              console.log(r);
            });
        });
    }
  },
  router,
  store: store,
  render: (h) => h(App)
}).$mount('#app');
