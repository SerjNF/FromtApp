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

    console.log(context.scheduleSelect.id)
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.invoicesList.push(data.data)

    }).catch(() => {
      console.log("bad request")
    })


  },


  getInvoiceListByClientId(context) {
    let url = "orders/noPersonal/getInvoiceListByClientId?token=" + this.getToken() + "&clientId=" + context.clId

    console.log(context.clId)
    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      console.log(data.data)
      context.invoicesList = data.data

    }).catch(() => {
      console.log("bad request")
    })

  },


  getScheduleClientByClient(context) {
    let url = "orders/noPersonal/getScheduleClientByClient?token=" + this.getToken() + "&clientId=" + context.clId

    console.log(context.clId)
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
