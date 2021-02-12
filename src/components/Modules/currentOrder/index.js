import {axInst} from '@/plugins/axInst'

export default {
  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },

  getOrders(scheduleId, context) {
    let url = "orders/noPersonal/getInvoiceByScheduleId?token=" + this.getToken() + "&scheduleId=" + scheduleId

    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      console.log(data)
      context.invoice = data.data
    }).catch((data) => {
      console.log("bad request " + data.response.data)
      this.warning(context, data.response.data)

    })
  },

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
      context(data.data)
      this.getScheduleClientByClient(context)
      context.scheduleSelect = []

    }).catch((data) => {
      console.log("bad request " + data.response.data)
      this.warning(context, data.response.data)

    })
  },
}
