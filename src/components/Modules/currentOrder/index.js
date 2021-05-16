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
      data.data.orderDtoList.forEach(function (item, i) {
        item.pos = i + 1
      })
      context.invoice = data.data
    }).catch((data) => {
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
      this.getInvoice(context.scheduleId, context)


    }).catch((data) => {
      console.log("bad request " + data.response.data)
      // this.warning (context, data.response.data)
    })
  },

  addPrice(context) {
    console.log("add Price")
    let url = "orders/noPersonal/addPrice?token=" + this.getToken() +
      "&id=" + context.editPrice.id +
      "&count=" + context.editPrice.counts +
      "&sale=" + context.editPrice.sale +
      "&invoiceId=" + context.invoice.id
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.invoice = data.data
    }).catch(() => {
      console.log("bad request")
    })
  },

  getPriceListByValue(val, context) {

    if (val === context.searchData && val.length > 1) {

      let url = "orders/noPersonal/getPriceListByValue?token=" + this.getToken() + "&value=" + val
      axInst({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        url: url,
      }).then((data) => {
        context.loadingData = data.data
      }).catch(() => {
        console.log("bad request")
      })
    }
  }

}
