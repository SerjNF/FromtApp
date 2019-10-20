<template xmlns="http://www.w3.org/1999/html">
  <div class='demo-app'>
    <v-container>
      <v-row>
        <v-col xl="10" md="10" sm="12">
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
            :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
            :plugins="calendarPlugins"
            :selectable="true"
            :weekends="calendarWeekends"
            :event-sources="calendarEvents"
            @dateClick="handleDateClick"
          />
        </v-col>
        <v-col xl="2" md="2" sm="12">
          <v-date-picker v-model="date" :show-current="false" width="auto"></v-date-picker>
          <v-select
            v-model="employeeSelect"
            :items="employeesList"
            item-text="fullName"
            item-value="id"
            label="Сотрудник"
            prepend-icon="assignment_ind"
            return-value>
          </v-select>

        </v-col>
      </v-row>
    </v-container>
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
                employeeSelect: '',
                date: new Date().toISOString().substr(0, 10),
                minTime: "8:00",
                maxTime: "23:00",
                slotDuration: "00:15",
                calendarPlugins: [ // plugins must be defined in the JS
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin, // needed for dateClick
                    resourceTimeGridPlugin
                ],
                calendarWeekends: true,
                calendarEvents: [
                    //    {events(start, end, timezone, callback){

                    //        }},
                    {title: 'Event Now', start: new Date()}
                ]
            }
        },
        mounted() {
            this.initialization()

        },

        methods: {
            initialization(){
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
                if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
                    this.calendarEvents.push({ // add new event data
                        title: 'New Event',
                        start: arg.date,
                        allDay: arg.allDay
                    })
                }
            }
        }
    }
</script>

<style >

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
