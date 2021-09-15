export const routes = [
    {
        path: '*',
        name: 'NotFound',
        component: () => import('./components/NotFound.vue')
    }, {
        path: '/',
        name: 'locations',
        component: () => import('./views/Locations.vue'),
        meta: {
            auth: false
        }
    }, {
        path: '/help',
        name: 'help',
        component: () => import('./views/Help.vue'),
        meta: {
            auth: false
        }
    }, {
        path: '/top',
        name: 'top',
        component: () => import('./views/Top.vue'),
        meta: {
            auth: false
        }
    }, {
        path: '/access',
        redirect: {
            name: "login"
        }
    }, {
        path: "/profile",
        name: "user-profile",
        component: () => import('./views/UserProfile.vue'),
    }, {
        path: '/admin',
        name: 'admin',
        component: () => import('./views/Admin.vue'),
        //beforeEnter: (to, from, next) => {
            
        //}
    }
]