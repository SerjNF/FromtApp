import {axInst} from '@/plugins/axInst'

export default {
  initialize(context) {
    let url = "admin/employee/getAllEmployee?token=" + this.getToken()
    context.desserts = []
    axInst.get(url).then((res) => {
      context.desserts = res.data
    })
  },

  saveEmployee(context, employee) {
    console.log(employee)
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/employee/saveEmployee?token=" + this.getToken(),
      data: employee,
    }).then((res) => {
      this.access(context, res)
    }).catch((error) => {
      this.warning(context, error)
    })
  },

  delEmployee(context, employee) {
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
