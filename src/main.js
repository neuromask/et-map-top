import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import VueGtag from "vue-gtag"
import Vuex from "vuex"
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueMobileDetection from "vue-mobile-detection"
import {vueTelegramLogin} from "vue-telegram-login"
import AppNavbar from './components/AppNavbar.vue'




import './scss/style.scss'

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuex)
Vue.use(VueMobileDetection)
Vue.component('vueTelegramLogin', vueTelegramLogin)
Vue.component('app-navbar', AppNavbar)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

Vue.use(VueGtag, {
  config: { id: "G-H7BDVQX6FQ" },
  params: {
    send_page_view: true
  }
}, router);




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
      if (this.user.uin != null) this.isLogged = true;
      console.log(this.user);
      // gets user as an input id, first_name, last_name, username, photo_url, auth_date and hash
      
     /*   axios.defaults.withCredentials = true;
        axios
        .post(this.$root.BACKEND_BASE + '/user', this.user)
        .then(response => {
          console.log(response);
            if (response.status == '200') {
              this.user;
            } else {
                console.log("err");
            }
        }); */
    }
  },
  router,
  store: store,
  render: (h) => h(App)
}).$mount('#app')