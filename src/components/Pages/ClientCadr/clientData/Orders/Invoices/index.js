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
  addInvoices(context) {
    let url = "orders/noPersonal/addInvoice?token=" + this.getToken() + "&scheduleId=" + context.scheduleSelect.id

    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.invoicesList.push(data.data)
      this.getScheduleClientByClient(context)
      context.scheduleSelect = []

    }).catch((data) => {
      console.log("bad request " + data.response.data)
      this.warning (context, data.response.data)

    })
  },


  getInvoiceListByClientId(context) {
    let url = "orders/noPersonal/getInvoiceListByClientId?token=" + this.getToken() + "&clientId=" + context.clId

    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {

      context.invoicesList = data.data
      console.log(data.data)
    }).catch(() => {
      console.log("bad request")
    })
  },


  getScheduleClientByClient(context) {
    let url = "orders/noPersonal/getScheduleClientByClient?token=" + this.getToken() + "&clientId=" + context.clId
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
  },

  access(context, res) {
    context.badData = true
    context.snacMessage = res.data
    context.snacColor = "green"
  },

  warning(context, error) {
    context.badData = true
    context.snacMessage = error
    context.snacColor = "#ff5252"
  },
}
