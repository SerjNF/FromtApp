/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from "vuex-shared-mutations"
import page from './modules/pageLink'
import currentUser from './modules/currentUser'

Vue.use(Vuex)

const axInst = Axios.create({
  baseURL: `http://${window.location.hostname}:8080/api/v1`,
  proxyHeaders: false,
  credentials: false
})

let token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")


export default new Vuex.Store({
  modules: {
    link: page,
    user : currentUser
  },
  state: {},
  actions: {},
  mutations: {},
  getters: {},

  
  plugins: [
    createPersistedState({
      paths: ['user']
    })
    // createMutationsSharer({predicate: ["mutation1", "mutation2"]})
  ]
})


