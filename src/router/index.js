import Vue from 'vue'
import VueRouter from 'vue-router'

import Locations from '@/views/Locations.vue'
import Top from '@/views/Top.vue'
import Admin from '@/views/Admin.vue'

import NotFound from '@/components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      auth: true
    }
  }, {
    path: '/protected',
    name: 'protected',
    component: Admin,
    meta: {
      auth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!VuexPersistence.getItem('user-password')) next('/protected')
    else next()
  } else next()
})

export default router
