/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import page from './modules/pageLink'
import currentUser from './modules/currentUser'

import general from './modules/general'
import openedCard from "./modules/openedCard";

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    link: page,
    user : currentUser,
    general: general,
    openCard: openedCard
  },
  state: {},
  actions: {},
  mutations: {},
  getters: {},


  plugins: [
    createPersistedState({
      paths: ['user', 'general', 'openCard']
    })
    // createMutationsSharer({predicate: ["mutation1", "mutation2"]})
  ]
})


