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

const page =
  {
    namespaced: true,
    state: {
      page: 1
    },
    actions: {
      SET_PAGE({commit}, page) {
        commit('SET_PAG', page)
      }
    },
    mutations: {
      SET_PAG(state, page) {
        state.page = page
      }
    },
    getters: {
      GET_PAGE: (state) => state.page
    }
  }


export default new Vuex.Store({
  modules: {
    link: page
  },

  state: {
    currentUser: {
      auth: false,
      fullName: '',
      role: '',
      token: ''
    }
  },
  actions: {
    GET_USER: (context, data) => {
      let url = '/main/currentUser?token=' + data
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
          role: res.data.role,
          token : data
        }
        context.commit('SET_USER', user)
      })
    },
    SET_TOKEN: (context, data) => {
      context.commit('SET_TOKEN', data)
    }
  },
  mutations: {
    SET_USER: (state, data) => {
      state.currentUser = data
    },
    SET_TOKEN: (state, data) => {
      state.currentUser.token = data
    }
  },
  getters: {
    getAuch: state => state.currentUser.auth,
    getFullName: state => state.currentUser.fullName,
    getRole: state => state.currentUser.role,
    getToken: state => state.currentUser.token
  },

  plugins: [createPersistedState()
    // createMutationsSharer({predicate: ["mutation1", "mutation2"]})
  ]
})


