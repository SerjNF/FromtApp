<template xmlns="http://www.w3.org/1999/html">
  <div class='demo-app'>

    <v-row>
      <v-col xl="10" lg="9" md="9" sm="12">
        <!--    <div class='demo-app-top'>-->
        <!--      <button @click="toggleWeekends">toggle weekends</button>-->
        <!--      <button @click="gotoPast">go to a date in the past</button>-->
        <!--      (also, click a date/time to add an event)-->
        <!--    </div>-->
        <FullCalendar
          schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
          class='demo-app-calendar'
          ref="fullCalendar"
          locale="ru"
          height="auto"
          :slot-duration="slotDuration"
          :min-time="minTime"
          :max-time="maxTime"
          defaultView="resourceTimeGrid"
          now-indicator="true"
          nav-links="true"
          selectable="true"
          :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,resourceTimeGridWeek,resourceTimeGridDay,listWeek'
      }"
          :plugins="calendarPlugins"
          :selectable="true"
          :weekends="calendarWeekends"
          :events="events"

          @select="select"
        />
      </v-col>
      <v-col xl="2" lg="3" md="3" sm="12" class="pl-lg-0 pl-md-0 pa-sm-8 ">
        <v-date-picker v-model="date" :show-current="false" width="auto"></v-date-picker>
        <v-select
          v-model="employeeSelect"
          :items="employeesList"
          @change="setResource()"
          item-text="fullName"
          label="Сотрудник"
          prepend-icon="assignment_ind"
          return-object>
        </v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
    import Employee from './index.js'

    export default {
        components: {
            FullCalendar // make the <FullCalendar> tag available
        },
        data: () => {
            return {
                employeesList: [],
                employeeSelect: "",
                date: new Date().toISOString().substr(0, 10),
                minTime: "8:00",
                maxTime: "23:00",
                slotDuration: "00:30",
                calendarPlugins: [ // plugins must be defined in the JS
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin, // needed for dateClick
                    resourceTimeGridPlugin
                ],
                resources: [],
                defaultView: 'resourceTimeGridWeek',
                calendarWeekends: true,
                events: function (info, successCallback, failureCallback) {
                    console.log(info)
                }

            }
        },
        mounted() {
            this.initialization()

        },

        methods: {

            setResource() {
                let calendarApi = this.$refs.fullCalendar.getApi()

                calendarApi.addResource({
                    id: this.employeeSelect.id,
                    title: this.employeeSelect.fullName
                })
                calendarApi.refetchEvents()
            },

            initialization() {
                Employee.initialize(this)
            },

            toggleWeekends() {
                this.calendarWeekends = !this.calendarWeekends // update a property
            },
            gotoPast() {
                let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
                calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
            },
            handleDateClick(arg) {
                //     if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
                //         this.calendarEvents.push({ // add new event data
                //             title: 'New Event',
                //             start: arg.date,
                //             end: (new Date + 3600)
                //         })
                //         console.log(this.calendarEvents)
                //     }
            },

            select(arg) {
                if (arg.view.type !== "dayGridMonth") {
                    var json = '{ "start":"' + arg.start.getTime() + '" ,' +
                        '"end":"' + arg.end.getTime() + '" ,' +
                        '"resourcesId":"' + arg.resource.id + '"}';
                    console.log("Json = " + json)
                }
            }
        },

        computed: {}
    }
</script>

<style>

  @import '../../../../../node_modules/@fullcalendar/core/main.css';
  @import '../../../../../node_modules/@fullcalendar/daygrid/main.css';
  @import '../../../../../node_modules/@fullcalendar/timegrid/main.css';

  @media (min-width: 1264px) {
    .container {
      width: 100%
    }
  }


  .fc-button-active {
    background: #1143d5;
  }

  .fc-button-primary {
    background: #7386d5;
  }

  /*.demo-app {*/
  /*  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;*/
  /*  font-size: 14px;*/
  /*}*/
  /*.demo-app-top {*/
  /*  margin: 0 0 3em;*/
  /*}*/
  /*.demo-app-calendar {*/
  /*  margin: 20px;*/

  /*}*/
</style>
