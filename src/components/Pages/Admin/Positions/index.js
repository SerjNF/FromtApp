export default {
  initialize(context, axInst) {
    let url = "main/getAllPosition?token=" + this.getToken()
    context.desserts = []
    axInst.get(url).then((res) => {
      console.log(res);
      context.desserts = res.data
    })
  },

  savePosition(context, position, axInst) {
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

  delPosition(context, position, axInst) {
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
    context.snaccolor = "green"
    context.initialize()
  },

  warning(context, error) {
    context.badData = true
    context.snacMessage = error.response.data
    context.snaccolor = "#ff5252"
    console.log(error.response.data)
  },

  getPositions(context, axInst) {
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
