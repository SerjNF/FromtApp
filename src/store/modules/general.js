import {axInst} from '@/plugins/axInst'

export default {
  namespaced: true,
  state: {
    Time: {
      start: "",
      end: "",
    }
  },
  actions: {
    GET_WORKTIME({commit}, data) {
      let url = '/main/getSetting?token=' + data
      axInst({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        url: url,
      }).then((res) => {
        console.log("Данные о времени " + res.data.startWorkTime)
        console.log("Данные о времени " + res.data.endWorkTime)
        let workTime = {
          start: res.data.startWorkTime,
          end: res.data.endWorkTime,
        }

        commit('SET_WORKTIME', workTime)
      })
    },

  },
  mutations: {
    SET_WORKTIME(state, data) {
      console.log(data)
      state.Time = data
    },
  },
  getters: {},


}
