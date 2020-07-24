import {axInst} from '@/plugins/axInst'
import {calendarIndex} from '../index'

function formatTime(time) {
  let date = new Date(time)
  let minute = date.getMinutes().toString() === "0" ? "00" : date.getMinutes()
  return date.getHours() + ":" + minute
}


export default {

  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },

  getClientRecordDetails(context, val) {
    let url = "client/getClientRecordDetails?token=" + this.getToken() + "&val=" + val

    axInst({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
    }).then((data) => {
      context.editedItem = data.data
      context.startTime = formatTime(context.editedItem.start)
      context.endTime = formatTime(context.editedItem.end)
    }).catch(() => {
      console.log("bad request")
    })
  },

  access(context, res) {
    console.log("access")
    context.badData = true
    context.snacMessage = res.data
    context.snacColor = "green"

  },
  warning(context, error) {
    context.badData = true
    context.snacMessage = error.response.data
    context.snacColor = "#ff5252"
  },
}
