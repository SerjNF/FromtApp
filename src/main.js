// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import vuetify from './plugins/vuetify'
import Navigation from './components/Modules/Navigation'
import ClientCalendar from './components/Pages/Shcedule/fullcalendar_client/ClientCalendar'
import store from './store'
import('../node_modules/vuetify/dist/vuetify.min.css')


Vue.use(VueCookie)
Vue.config.productionTip = false

Vue.component('Navigation', Navigation)
//Vue.component('ClientCalendar', ClientCalendar)

/* eslint-disable */
new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  components: {App},
  template: '<App/>',
})
