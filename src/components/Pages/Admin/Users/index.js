export default {

  initialization(context, axInst){

    let url = "admin/getUsers?token=" + this.getToken()
    axInst.get(url).then((res) => {
      context.desserts = res.data
    })
  },

  saveUser(context, user, axInst) {
    //  let token = store.state.user.User.token

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
    context.snacColor = "green"
    context.initialize()
  },

  warning(context, error) {
    context.badData = true
    context.snacMessage = error.response.data
    context.snacColor = "#ff5252"
  },

  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  }
}

