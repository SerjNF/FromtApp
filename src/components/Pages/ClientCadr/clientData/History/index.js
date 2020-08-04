import {axInst} from '@/plugins/axInst'


export default {
  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },

  initialization(context, id) {
    let url = "client/getClientHistory?token=" + this.getToken() + "&clientId=" + id;
    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.historyList = data.data
    }).catch(() => {
      console.log("bad request")
    })
  }
}
