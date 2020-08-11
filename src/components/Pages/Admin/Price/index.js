import {axInst} from '@/plugins/axInst'


export default {
  initialization (context){
    let url = "admin/price/getCategory?token=" + this.getToken()

    console.log(url)
    context.categoryItems = []
    axInst.get(url).then((res) => {
      console.log(res.data)
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

    })

  },


  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  }

}