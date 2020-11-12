import {axInst} from '@/plugins/axInst'


export default {
  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },

  initialization(context, id) {
    let url = "client/noPersonal/getClientCard?token=" + this.getToken() + "&clientId=" + id
    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.clientData = data.data
      context.clientDefData.clientDto = Object.assign({}, context.clientData.clientDto)
      context.clientDefData.clientCardDto = Object.assign({}, context.clientData.clientCardDto)
    }).catch(() => {
      console.log("bad request")
    })
  },

  save(context){
    let url = "client/noPersonal/saveClientCard?token=" + this.getToken()

    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
      data: context.clientData,
    }).then((data) => {
      if (data.status === 200) {
        context.clientDefData.clientDto = Object.assign({}, context.clientData.clientDto)
        context.clientDefData.clientCardDto = Object.assign({}, context.clientData.clientCardDto)
        context.isClient = true
        context.isCard = true
        this.access(context, data)
        setTimeout(1000);
        this.initialization(context, context.clientData.clientDto.id)
      }
    }).catch((error) => {
      this.warning(context, error)
    })
  },

  access(context, res) {
    context.snacMessage = res.data,
      context.snacColor = "green"
    context.badData = true
  },

  warning(context, error) {
    context.badData = true
    context.snacMessage = error.response.data
    context.snacColor = "#ff5252"
  },
}
