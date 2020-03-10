import {axInst} from '@/plugins/axInst'

export default {

  initialize(context) {
    let url = "employee/getEmployeesFullName?token=" + this.getToken()
    context.employeesList = []
    axInst.get(url).then((res) => {
      context.employeesList = res.data
    })
  },

  setDuration(sdf){

    console.log("sdf")
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

  eventDrop(arg, calendarApi){
    let resourceId = arg.newResource === null ? "" : arg.newResource.id;
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

  eventResize(arg, calendarApi){
    let resourceId = "";
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

// saveEmployee(context, employee, axInst) {
//   console.log(employee)
//   axInst({
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//       "Access-Control-Allow-Origin": "*",
//     },
//     url: "/admin/employee/saveEmployee?token=" + this.getToken(),
//     data: employee,
//   }).then((res) => {
//     this.access(context, res)
//   }).catch((error) => {
//     this.warning(context, error)
//   })
// },
//
// delEmployee(context, employee, axInst) {
//   axInst({
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//       "Access-Control-Allow-Origin": "*",
//     },
//     url: "/admin/delUser/" + user.id + "?token=" + this.getToken(),
//     data: '',
//   }).then((res) => {
//     this.access(context, res)
//   }).catch((error) => {
//     this.warning(context, error)
//   })
// },
//
// access(context, res) {
//   context.badData = true
//   context.snacMessage = res.data
//   context.snacColor = "green"
//   context.initialize()
// },
//
// warning(context, error) {
//   context.badData = true
//   context.snacMessage = error.response.data
//   context.snacColor = "#ff5252"
// },

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
  }
}
