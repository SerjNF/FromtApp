import createPersistedState from "vuex-persistedstate";
import Axios from "axios";
import Users from "../../components/Pages/Admin/Users/Users";

const axInst = Axios.create({
  baseURL: `http://${window.location.hostname}:8080/api/v1`,
  proxyHeaders: false,
  credentials: false
})

export default {
  namespaced: true,
  state: {
    User: {
      auth: false,
      fullName: '',
      role: '',
      token: ''
    }
  },
  actions: {
    GET_USER({commit}, data) {
      let url = '/main/currentUser?token=' + data
      axInst({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        url: url,
      })
        .then((res) => {
          console.log("данные после логина" + res)
          let user = {
            auth: true,
            fullName: res.data.login,
            role: res.data.role,
            token: ''
          }
          commit('SET_USER', user)
        })
    },

    SET_TOKEN({commit}, data) {
      commit('SET_TOKEN', data)
      //  this.action.GET_USER({commit}, data)
    }
  },
  mutations: {
    SET_USER(state, data) {
      state.User = data
    },
    SET_TOKEN(state, data) {
      state.User.token = data
    }
  },
  getters: {

  },


}
