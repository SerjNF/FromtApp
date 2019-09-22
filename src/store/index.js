/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const index = new Vuex.Store({
  state: {
    user: {
      auth: true    }
  },
  actions: {

  },
  mutations: {

  },
  getters: {
    getAuth(state){
      return state.user.auth
    }
  }
})

export default index
