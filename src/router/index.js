import Vue from 'vue'
import Router from 'vue-router'
// import * as Logg from '@/components/Pages/Login'


import Login from '@/components/Pages/Login/Login'
import Schedule from "../components/Pages/Shcedule/Schedule";
import Admin from "../components/Pages/Admin/Admin";
import ClientCards from "../components/Pages/ClientCadr/ClientCards";

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
      path: '/date/:d?',
      name: 'ScheduleOnDate',
      component: Schedule,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiredAuth: false
      }
    },
    {
      path: '/card/:id?',
      name: 'Card',
      component: ClientCards,
      meta: {
        requiredAuth: true
      }
    },
    // {
    //   path: '/card/:id?',
    //   name: 'Card',
    //   component: ClientCards,
    //   meta: {
    //     requiredAuth: true
    //   }
    // }
  ]
})
/* eslint-disable */
//TODO не работает, надо переделать
// router.beforeEach((to, from, next) => {
//
//
//   if (to.meta.requiredAuth) {
//     // eslint-disable-next-line
//         console.log(store)
//         console.log(store.getters.getAuch)
//     if (store.getters.getAuch) {
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
