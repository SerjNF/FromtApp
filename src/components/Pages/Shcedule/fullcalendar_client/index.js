import {axInst} from '@/plugins/axInst'

function formatTime(time) {
  let date = new Date(time);
  let minute = date.getMinutes().toString() === "0" ? "00" : date.getMinutes();
  return date.getHours() + ":" + minute
}

export default {
  printSchedule(data) {
    let calendar = data.$refs.fullCalendar.getApi();

    let resId = [];
    calendar.getResources().forEach((value) => {
      resId.push(value._resource.id)
    });
    let start = Number(calendar.getDate().getTime());
    let oneDay = Number(86400000);
    let end = start + oneDay;

    let url = "/client/printSchedule?token=" + this.getToken() + "&start=" + start + "&end=" + end + "&res=" + resId.toString();
    window.location = axInst.defaults.baseURL + url;
  },

  initialize(context, d) {

    if (d !== undefined) {
      context.date = new Date(parseInt(d)).toISOString().substr(0, 10)
    }

    let url = "employee/getEmployeesWorkSchedule?token=" + this.getToken();
    context.employeesList = [];

    axInst.get(url).then((res) => {
      context.employeesList = res.data
    })
  },

  setScheduleClient(context, arg) {
    context.editedItem.resourcesId = arg.resource.id;
    context.editedItem.start = arg.start.getTime();
    context.startTime = formatTime(arg.start);

    context.editedItem.end = arg.end.getTime();
    context.endTime = formatTime(arg.end);
    context.dialog = true
    console.log("click")
  },

  addEvent(context, calendarApi) {
    let url = "client/noPersonal/setScheduleClient?token=" + this.getToken();
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
      data: context.editedItem,
    }).then((data) => {
      this.access(context, data);
        calendarApi.unselect();
        setTimeout(1000);
        calendarApi.refetchEvents();
        context.selectClient = null;
        context.editedItem = Object.assign({}, context.defaultItem);
        context.dialog = false
    }).catch(error => {
        this.warning(context, error)
      }
    )
  },

  eventResizeAndDrop(arg, calendarApi, context) {
    let resourceId = "";
    if (arg.newResource !== undefined) {
      resourceId = arg.newResource === null ? "" : arg.newResource.id;
    }

    let start = arg.event.start.getTime();
    let end = arg.event.end === null ? 0 : arg.event.end.getTime();

    context.editedItem.start = start;
    context.editedItem.end = end;
    context.editedItem.eventId = arg.event.id;
    context.editedItem.resourcesId = resourceId;

    let url = "client/noPersonal/eventDropScheduleClient?token=" + this.getToken();
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
      data: context.editedItem,
    }).then((data) => {
      if (data.status === 200) {
        calendarApi.unselect();
        setTimeout(1000);
        calendarApi.refetchEvents()
        this.access(context, data)
      }
    }).catch((error) => {
      calendarApi.refetchEvents()
      this.warning(context, error)
    })
  },

  getPositions(context, axInst) {
    let url = "main/getAllPosition?token=" + this.getToken()
    context.desserts = []
    axInst.get(url).then((res) => {
      context.positionsList = res.data
    })
  },

  getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  },


  getResources(info, selectId, successCallback) {
    let onSchedule = selectId.length === 0

    let start = info.start.valueOf()
    let end = info.end.valueOf()

    let json = '{ "start": "' + start + '" ,' +
      '"end":"' + end + '" ,' +
      '"onSchedule":"' + onSchedule + '" ,' +
      '"resourcesId":"' + selectId + '"}';
    let url = "client/getClientResources?token=" + this.getToken()

    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
      data: json,
    }).then((data) => {
      if (data.status === 200) {
        successCallback(data.data)
      }
    }).catch(() => {
      console.log("bad request")
    })
  },

  getEvetns(info, resourcesId, successCallback) {
    let json = '{ "start": "' + info.start.valueOf() + '" ,' +
      '"end":"' + info.end.valueOf() + '" ,' +
      '"resourcesId":"' + resourcesId + '"}';

    let url = "client/getClientEvents?token=" + this.getToken()
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
      data: json,
    }).then((data) => {
      successCallback(data.data)
    }).catch(() => {
      console.log("bad request")
    })
  },

  getClientListFiltered(val, context) {
    if (val.length === 2) {
      let url = "client/noPersonal/getClientListFiltered?token=" + this.getToken() + "&val=" + val

      axInst({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        url: url,
      }).then((data) => {
        context.clientList = data.data
      }).catch(() => {
        console.log("bad request")
      })
    }
  },

  access(context, res) {
    context.badData = true
    context.snacMessage = res.data
    context.snacColor = "green"
  },

  warning(context, error) {
    context.badData = true
    context.snacMessage = error.response.data
    context.snacColor = "#ff5252"
  },

  batTime(context, msg) {
    context.badData = true
    context.snacMessage = msg
    context.snacColor = "#ffd33d"
  }
}
