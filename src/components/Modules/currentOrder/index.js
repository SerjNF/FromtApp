import {axInst} from '@/plugins/axInst'

export default {
  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },

  getInvoice(scheduleId, context) {
    let url = "orders/noPersonal/getInvoiceByScheduleId?token=" + this.getToken() + "&scheduleId=" + scheduleId

    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.isInvoice = true
      context.invoice = data.data
    }).catch((data) => {
      console.log("bad request " + data.response.data)
      context.isInvoice = false

    })
  },


  addInvoice(context) {
    let url = "orders/noPersonal/addInvoice?token=" + this.getToken() + "&scheduleId=" + context.scheduleId

    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.isInvoice = true
      this.getInvoice(context.scheduleId, context)
      console.log(data)

    }).catch((data) => {
      console.log("bad request " + data.response.data)
      // this.warning (context, data.response.data)
    })
  },

  getPriceListByValue(val, context){

    if(val === context.searchData && val.length > 1){

      let url = "orders/noPersonal/getPriceListByValue?token=" + this.getToken() + "&value=" + val
      console.log("search " + val)
      axInst({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        url: url,
      }).then((data) => {
        console.log( data.data)
        context.loadingData = data.data
      }).catch(() => {
        console.log("bad request")
      })
    }
  }

}