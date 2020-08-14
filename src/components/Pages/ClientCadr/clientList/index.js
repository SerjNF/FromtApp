import {axInst} from '@/plugins/axInst'

export default {
  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },

  initialization(context) {
    let url = "client/noPersonal/getAllClients?token=" + this.getToken()
    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
    //  console.log(data.data)
      context.clientListLoad = data.data
      context.clientList = context.clientListLoad;
    }).catch(() => {
      console.log("bad request")
    })
  },

}
