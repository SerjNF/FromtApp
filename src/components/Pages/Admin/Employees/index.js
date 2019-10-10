export default {
  initialize(context, axInst) {
    let url = "admin/employee/getAllEmployee?token=" + this.getToken()
    context.desserts = []
    axInst.get(url).then((res) => {
      console.log(res)
      context.desserts = res.data
    })
  },

  saveUser(context, user, axInst) {
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/saveUser?token=" + this.getToken(),
      data: user,
    }).then((res) => {
      this.access(context, res)
    }).catch((error) => {
      this.warning(context, error)
    })
  },

  delUser(context, user, axInst) {
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/delUser/" + user.id + "?token=" + this.getToken(),
      data: '',
    }).then((res) => {
      this.access(context, res)
    }).catch((error) => {
      this.warning(context, error)
    })
  },

  access(context, res) {
    context.badData = true
    context.snacMessage = res.data
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
