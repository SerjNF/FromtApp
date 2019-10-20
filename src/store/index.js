/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import page from './modules/pageLink'
import currentUser from './modules/currentUser'

Vue.use(Vuex)


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


