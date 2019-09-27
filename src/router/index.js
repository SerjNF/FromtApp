import Vue from 'vue'
import Router from 'vue-router'
// import * as Logg from '@/components/Pages/Login'

// import store from '../store'
import Login from '@/components/Pages/Login/Login'
import Schedule from "../components/Pages/Shcedule/Schedule";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Schedule',
      component: Schedule,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
/* eslint-disable */

// router.beforeEach((to, from, next) => {
//
//
//   if (to.meta.requiredAuth) {
//     // eslint-disable-next-line
//
//     if (store.getters.getAuth) {
//       next()
//     } else {
//       router.push('/login').then(r => {
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
