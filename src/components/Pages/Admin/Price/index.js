import {axInst} from '@/plugins/axInst'


export default {
  initialization(context) {
    let url = "admin/price/getCategory?token=" + this.getToken()
    context.categoryItems = []
    axInst.get(url).then((res) => {
      res.data.forEach(function (item, i) {
        item.pos = i + 1
      })

      context.categoryItems = res.data
    })
  },

  saveCategory(row, context) {
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

      this.warning(context, error.response.data)
    })
  },

  removeCategory(row, context) {
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
      this.warning(context, error.response.data)
    })
  },

  getPriceByCategoryId(id, context) {
    let url = "admin/price/getPriceByCategoryId?id=" + id + "&token=" + this.getToken()

    context.priceItems = []
    axInst.get(url).then((res) => {
      context.priceItems = res.data
    })
  },

  savePrice(row, context) {
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/price/savePrice?id=" + context.selectRowCategory.id + "&token=" + this.getToken(),
      data: row,
    }).then(res => {
      context.priceItems = res.data
      context.editPrice = false;
    }).catch(error => {
      console.log(error.response)
      this.warning(context, error.response.data)
      this.getPriceByCategoryId(context.selectRowCategory.id, context)
    })
  },

  removePrice(row, context) {
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/admin/price/removePrice?id=" + context.selectRowCategory.id + "&token=" + this.getToken(),
      data: row,
    }).then((res) => {

      context.priceItems = res.data
    }).catch((error) => {
      this.warning(context, error.response.data)
      this.getPriceByCategoryId(context.selectRowCategory.id, context)
    })
  },

  printPrice() {
    let url = "/admin/price/download?token=" + this.getToken();
    window.location = axInst.defaults.baseURL + url;
  },

  uploadPrice(context) {

    if (context.file !== null) {
      let formData = new FormData();
      // additional data
      formData.append("file", context.file);
      axInst
        .post("/uploadFile", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.access(context, "Данные обновленны")
          context.categoryItems = response.data
        })
        .catch(error => {
          this.warning(context, error.response.data)
        });
      context.file = null
    } else {
      this.warning(context, "Файл не найден")
    }
  },

  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },
  access(context, res) {
    context.timeOut = 2000
    context.badData = true
    context.snacMessage = res
    context.snacColor = "green"
  },
  warning(context, error) {
    context.timeOut = 200000
    context.badData = true
    context.snacMessage = error
    context.snacColor = "#ff5252"
  },


}
