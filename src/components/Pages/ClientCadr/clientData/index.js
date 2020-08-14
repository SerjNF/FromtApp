import {axInst} from '@/plugins/axInst'

export default {
  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },

  initialization(context, id) {
    let url = "client/noPersonal/getClientCard?token=" + this.getToken() + "&clientId=" + id
    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.clientData = data.data
      context.dataLoad = true
      console.log(context.clientData)
    }).catch(() => {
      console.log("bad request")
    })
  },

}
