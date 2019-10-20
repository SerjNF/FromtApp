import {axInst} from '@/plugins/axInst'

export default {
  initialize(context) {
    let url = "main/getAllPosition?token=" + this.getToken()
    context.desserts = []
    axInst.get(url).then((res) => {
      context.desserts = res.data
    })
  },

  savePosition(context, position) {
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/savePosition/?Position=" + position.positions + "&token=" + this.getToken(),
    }).then((res) => {
      this.access(context, res)
    }).catch((error) => {
      this.warning(context, error)
    })
  },

  delPosition(context, position) {
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/delPosition/" + position.id + "?token=" + this.getToken(),
      data: '',
    }).then((res) => {
      this.access(context, res)
    }).catch((error) => {
      this.warning(context, error)
    })
  },

  access(context, res) {
    context.badData = true
    context.snacMessage = res.data.msg
    context.snacColor = "green"
    context.initialize()
  },

  warning(context, error) {
    context.badData = true
    context.snacMessage = error.response.data
    context.snacColor = "#ff5252"
  },

  getPositions(context) {
    let url = "main/getAllPosition?token=" + this.getToken()
    context.desserts = []
    axInst.get(url).then((res) => {
      context.positionsList = res.data
    })
  },

  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  }
}
