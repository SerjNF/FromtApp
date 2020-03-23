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
          editable="true"
          :custom-buttons="buttons"
          :header="{
        left: 'prev,next, today, interval',
        center: 'title',
        right: 'dayGridMonth,resourceTimeGridWeek,resourceTimeGridDay,listWeek'
      }"
          :plugins="calendarPlugins"
          :selectable="true"
          :weekends="calendarWeekends"
          :events="events"
          @select="select"
          @eventClick="eventClick"
          @eventDrop="eventDrop"
          @eventResize="eventResize"
        />
      </v-col>
      <v-col xl="2" lg="3" md="3" sm="12" class="pl-lg-0 pl-md-0 pa-sm-8 ">
        <v-date-picker
          v-model="date"
          :show-current="true"
          :picker-date.sync="pickerDate"
          width="auto"></v-date-picker>
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
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">{{editedItem.title}}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-time-picker v-model="editedItem.startTime" color="green lighten-1"
                               header-color="primary"></v-time-picker>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  prepend-icon="how_to_reg"
                  v-model="editedItem.start" label="Начало смены"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  prepend-icon="how_to_reg"
                  v-model="editedItem.end" label="Окончание смены"></v-text-field>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
          <v-btn color="blue darken-1" text :disabled="false">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSetDuration" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">{{editedItem.title}}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <!--              <v-col cols="12" sm="6" md="4">-->
              <v-col>
                <v-subheader class="pl-0">Always show thumb label</v-subheader>
                <v-slider
                  v-model="slider"
                  step="10"
                  thumb-label="always"
                ></v-slider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
          <v-btn color="blue darken-1" text :disabled="false">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
    import Employee from './index.js'

    let selectId = ""

    export default {
        components: {
            FullCalendar // make the <FullCalendar> tag available
        },
        data: () => {
            return {
                slider: 45,

                buttons: {
                    interval: {
                        text: 'custom!',
                        click: () => this.a.date.dialogSetDuration = true
                    }
                },
                editedItem: {
                    start: '',
                    end: '',
                    title: '',
                    startTime: ''
                },

                dialog: false,
                dialogSetDuration: false,
                employeesList: [],
                employeeSelect: "",
                lastResource: "",
                date: new Date().toISOString().substr(0, 10),
                pickerDate: null,
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
                    Employee.getEvetns(info, selectId, successCallback)
                }
            }

        },
        mounted() {
            this.initialization()

        },

        methods: {
            setResource() {
                let calendarApi = this.$refs.fullCalendar.getApi()
                console.log(this)
                let res = calendarApi.getResourceById(this.lastResource)
                if (res !== null) {
                    res.remove()
                }
                calendarApi.addResource({
                    id: this.employeeSelect.id,
                    title: this.employeeSelect.fullName
                })
                this.lastResource = this.employeeSelect.id
                selectId = this.employeeSelect.id
                calendarApi.refetchEvents()
            },

            initialization() {
                Employee.initialize(this)

            },

            toggleWeekends() {
                this.calendarWeekends = !this.calendarWeekends // update a property
            },
            gotoPast(context) {


                console.log(context)
            },
            handleDateClick(arg) {
            },

            select(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Employee.setScheduleEmployees(arg, calendarApi)
            },

            eventClick(info) {
                let endInfo = info.event.end;
                let start = info.event.start.getTime() - 60000 * new Date().getTimezoneOffset();
                let end = endInfo === null ? 0 : endInfo.getTime() - 60000 * new Date().getTimezoneOffset();

                this.editedItem.start = new Date(start).toISOString().slice(0, 16)
                this.editedItem.end = endInfo === null ? "" : new Date(end).toISOString().slice(0, 16)

                this.editedItem.startTime = new Date(info.event.start.getTime())
                this.dialog = true
            },

            eventDrop(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Employee.eventDrop(arg, calendarApi)
            },

            eventResize(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Employee.eventResize(arg, calendarApi)
            },

            close() {
                this.dialog = false
            }
        },

        watch: {
            pickerDate(val) {
                console.log(val)
            }
        },

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Новый сотрудник' : 'Редактировать профиль'
            },
        }

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
