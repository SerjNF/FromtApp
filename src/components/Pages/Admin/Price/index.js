import {axInst} from '@/plugins/axInst'


export default {
  initialization (context){
    let url = "admin/price/getCategory?token=" + this.getToken()

    context.categoryItems = []
    axInst.get(url).then((res) => {
      context.categoryItems = res.data
    })
  },

  saveCategory(row, context){
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/price/saveCategory?token=" + this.getToken(),
      data: row,
    }).then((res) => {
      context.categoryItems = res.data
    }).catch((error) => {
      this.warning(context, error)
    })
  },


  removeCategory(row, context){
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/price/removeCategory?token=" + this.getToken(),
      data: row,
    }).then((res) => {
      context.categoryItems = res.data
    }).catch((error) => {
      this.warning(context, error)
    })
  },




  getPriceByCategoryId(id, context) {
    let url = "admin/price/getPriceByCategoryId?id="+ id +"&token=" + this.getToken()

      context.priceItems = []
    axInst.get(url).then((res) => {
      context.priceItems = res.data
    })
  },


  savePrice(row, context){
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/price/savePrice?id="+ context.selectRowCategory.id +"&token=" + this.getToken(),
      data: row,
    }).then((res) => {
      context.priceItems = res.data
    }).catch((error) => {
      this.warning(context, error)
      this.getPriceByCategoryId(context.selectRowCategory.id, context)
    })
  },

  removePrice(row, context){
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/price/removePrice?id="+ context.selectRowCategory.id +"&token=" + this.getToken(),
      data: row,
    }).then((res) => {

      context.priceItems = res.data
    }).catch((error) => {
      this.warning(context, error)
      this.getPriceByCategoryId(context.selectRowCategory.id, context)
    })
  },

  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },

  warning(context, error) {
    context.badData = true
    context.snacMessage = error.response.data.msg
    context.snacColor = "#ff5252"
  },


}
