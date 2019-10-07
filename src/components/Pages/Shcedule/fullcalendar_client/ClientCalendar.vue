<template>
  <div class='demo-app'>

    <div class='demo-app-top'>
      <button @click="toggleWeekends">toggle weekends</button>
      <button @click="gotoPast">go to a date in the past</button>
      (also, click a date/time to add an event)
    </div>
    <FullCalendar
      schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
      class='demo-app-calendar'
      ref="fullCalendar"
      locale="ru"
      height="auto"
      :slot-duration="slotDuration"
      :min-time= "minTime"
      :max-time= "maxTime"
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
  </div>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'


    export default {
        components: {
            FullCalendar // make the <FullCalendar> tag available
        },
        data: () => {
            return {
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
                    { title: 'Event Now', start: new Date() }
                ]
            }
        },
        methods: {
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
  .demo-app {
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }
  .demo-app-top {
    margin: 0 0 3em;
  }
  .demo-app-calendar {
    margin: 20px;

  }
</style>
