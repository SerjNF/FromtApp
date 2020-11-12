import {axInst} from '@/plugins/axInst'

export default {
  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },
  // getPriceListFiltered(val, context) {
  //   let url = "client/noPersonal/getClientListFiltered?token=" + this.getToken() + "&val=" + val
  //
  //   axInst({
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=UTF-8',
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     url: url,
  //   }).then((data) => {
  //     context.priceList = data.data
  //   }).catch(() => {
  //     console.log("bad request")
  //   })
  //   })

  // },
  getScheduleClientByClient(context) {
    let url = "client/noPersonal/getScheduleClientByClient?token=" + this.getToken() + "&clientId=" + context.clId

    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.scheduleClient = data.data

    }).catch(() => {
      console.log("bad request")
    })

  }
}
