import {axInst} from '@/plugins/axInst'

export default {

  initialize(context) {
    let url = "employee/getEmployeesFullName?token=" + this.getToken()
    context.employeesList = []
    axInst.get(url).then((res) => {
      context.employeesList = res.data
    })
  },

  setScheduleEmployees(arg, calendarApi) {
    let url = "employee/setScheduleEmployees?token=" + this.getToken()
    if (arg.view.type !== "dayGridMonth") {
      var json = '{ "start":"' + arg.start.getTime() + '" ,' +
        '"end":"' + arg.end.getTime() + '" ,' +
        '"resourcesId":"' + arg.resource.id + '"}';

      axInst({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        },
        url: url,
        data: json,
      }).then((data) => {
        console.log(data)
        if (data.status === 200) {
          calendarApi.unselect();
          setTimeout(1000);
          calendarApi.refetchEvents()
        }
      }).catch(() => {
      })
    }
  },

  eventResizeAndDrop(arg, calendarApi){
    let resourceId = "";
    if (arg.newResource !== undefined){
      resourceId = arg.newResource === null ? "" : arg.newResource.id;
    }

    let start = arg.event.start.getTime();
    let end = arg.event.end === null ? 0 : arg.event.end.getTime();
    let json = '{ "start":"' + start + '" ,' +
      '"end":"' + end + '" ,' +
      '"eventId":"' + arg.event.id + '" ,' +
      '"resourcesId":"' + resourceId + '"}'

    let url = "employee/eventDropScheduleEmployees?token=" + this.getToken()
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
      data: json,
    }).then((data) => {
      console.log(data)
      if (data.status === 200) {
        calendarApi.unselect();
        setTimeout(1000);
        calendarApi.refetchEvents()
      }
    }).catch(() => {
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

  getEvetns(info, resourcesId, successCallback) {
    let start = info.start.valueOf();
    let end = info.end.valueOf();

    let json = '{ "start": "' + start + '" ,' +
      '"end":"' + end + '" ,' +
      '"resourcesId":"' + resourcesId + '"}';
    let url = "employee/getScheduleEmployees?token=" + this.getToken()

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
      context.badPassword = true
      console.log("bad request")
    })
  },


  removeScheduleEmployee(context, eventId, calendarApi) {
    let url = "employee/" + eventId + "/delScheduleEmployees?token=" + this.getToken()

    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: url,
      data: "",
    }).then((data) => {
      if (data.status === 200) {
        this.access(context, data)
        context.dialog = false
        calendarApi.refetchEvents()
      }
    }).catch(() => {
      this.warning(context, data)
      console.log("bad request")
    })

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
}
