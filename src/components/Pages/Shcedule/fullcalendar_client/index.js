import {axInst} from '@/plugins/axInst'

export default {

  initialize(context) {
    let url = "employee/getEmployeesFullName?token=" + this.getToken()
    context.employeesList = []
    axInst.get(url).then((res) => {
      context.employeesList = res.data
    })
  },



  setScheduleEmployees(context, arg) {

    context.editedItem.resourcesId = arg.resource.id
    context.editedItem.startTime = arg.start
    context.startTimePicker.HH = new Date(context.editedItem.startTime).getHours().toLocaleString()
    context.startTimePicker.mm = new Date(context.editedItem.startTime).getMinutes().toLocaleString()
    context.startTimePicker.mm = context.startTimePicker.mm === "0" ? context.startTimePicker.mm + "0" : context.startTimePicker.mm

    context.editedItem.endTime = arg.end
    context.endTimePicker.HH = new Date(context.editedItem.endTime).getHours().toLocaleString()
    context.endTimePicker.mm = new Date(context.editedItem.endTime).getMinutes().toLocaleString()
    context.endTimePicker.mm = context.endTimePicker.mm === "0" ? context.endTimePicker.mm + "0" : context.endTimePicker.mm
    context.dialog = true


    // let url = "employee/setScheduleEmployees?token=" + this.getToken()
    // if (arg.view.type !== "dayGridMonth") {
    //   var json = '{ "start":"' + arg.start.getTime() + '" ,' +
    //     '"end":"' + arg.end.getTime() + '" ,' +
    //     '"resourcesId":"' + arg.resource.id + '"}';
    //
    //   axInst({
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json;charset=UTF-8',
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //     url: url,
    //     data: json,
    //   }).then((data) => {
    //     console.log(data)
    //     if (data.status === 200) {
    //       calendarApi.unselect();
    //       setTimeout(1000);
    //       calendarApi.refetchEvents()
    //     }
    //   }).catch(() => {
    //   })
    // }
  },

  addEvent(context, calendarApi){

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

  //client
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
    let start = info.start.valueOf();
    let end = info.end.valueOf();

    let json = '{ "start": "' + start + '" ,' +
      '"end":"' + end + '" ,' +
      '"resourcesId":"' + resourcesId + '"}';
    console.table(json)
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
      if (data.status === 200) {
        console.table(data)
        successCallback(data.data)
      }
    }).catch(() => {
      context.badPassword = true
      console.log("bad request")
    })
  }
}
