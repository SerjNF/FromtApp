/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from "vuex-shared-mutations"

Vue.use(Vuex)

const axInst = Axios.create({
  baseURL: `http://${window.location.hostname}:8080/api/v1`,
  proxyHeaders: false,
  credentials: false
})

let token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")

export default new Vuex.Store({
  state: {
    currentUser: {
      auth: false,
      fullName: '',
      role: ''
    }
  },
  actions: {
    GET_USER: (context, playload) => {
      let url = '/main/currentUser?token=' + playload
      axInst({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        url: url,
      }).then((res) => {
        console.log(res)
        let user = {
          auth: true,
          fullName: res.data.login,
          role: res.data.role
        }
        context.commit('SET_USER', user)
      })
    }
  },
  mutations: {
    SET_USER: (state, playload) => {
      state.currentUser = playload
    }
  }
  ,
  getters: {
    getAuch: state => state.currentUser.auth,
    getFullName: state => state.currentUser.fullName,
    getRole: state => state.currentUser.role
  },

  plugins: [createPersistedState()
    // createMutationsSharer({predicate: ["mutation1", "mutation2"]})
  ]

})


