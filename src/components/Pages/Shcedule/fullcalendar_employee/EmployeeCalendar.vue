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
          locale="ru"
          :locales="allLocales"
          schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
          class='demo-app-calendar'
          ref="fullCalendar"

          height="auto"
          :slot-duration="slotDuration"
          :min-time="minTime"
          :max-time="maxTime"
          defaultView="resourceTimeGrid"
          now-indicator="true"
          nav-links="true"
          selectable="true"
          editable="true"
          :eventOverlap="false"
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
          :dates-render="datesRender"
        />
      </v-col>
      <v-col xl="2" lg="3" md="3" sm="12" class="pl-lg-0 pl-md-0 pa-sm-8 ">
        <v-flex xs25>
          <v-subheader class="pl-0">Интервал рассписания</v-subheader>
          <p></p>
          <v-slider
            v-model="slider"
            thumb-label="always"
            thumb-size="24"
            step="5"
            :max="60"
            :min="10"
          ></v-slider>
        </v-flex>
        <date-picker :somedata ="toDatePickerDate" @setCurrentDate="goToDates"></date-picker>
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
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{editedItem.title}}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <!--              <v-col cols="12" sm="6" md="4">-->
              <!--                <v-time-picker v-model="editedItem.startTime" color="green lighten-1"-->
              <!--                               header-color="primary"></v-time-picker>-->
              <!--              </v-col>-->
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  disabled
                  prepend-icon="how_to_reg"
                  v-model="editedItem.startTime" label="Начало смены"></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  disabled
                  prepend-icon="how_to_reg"
                  v-model="editedItem.endTime" label="Окончание смены"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="3" md="3">
                <v-select
                  multiple
                  v-model="selectDayOfWeek"
                  :items="repeatDialog.weekDay"
                  item-text="value"
                  item-value="id"
                  label="Дни повтора"
                ></v-select>
              </v-col>
              <v-col cols="6" sm="3" md="3">
                <v-select
                  v-model="selectDayNumber"
                  :items="repeatDialog.dayNumber"
                  item-text="value"
                  item-value="id"
                  label="Дни"

                ></v-select>
              </v-col>
              <v-col cols="3" sm="3" md="3">
                <v-select
                  v-model="editedItem.repeatCount"
                  :items="[1, 2, 3 , 4, 5, 6, 7, 14]"
                  item-text="value"
                  label="Количество повторов"
                  return="id"
                ></v-select>
              </v-col>
              <v-col class="repeat_btn" cols="3" sm="3" md="3">
                <v-btn
                  icon
                  color="green"
                  @click="repeatEmployeeSchedule"
                >
                  <v-icon>repeat</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" text @click="removeEmployeeSchedule">Удалить</v-btn>
          <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      bottom="bottom"
      text
      v-model="badData"
      :color=snacColor>
      {{ snacMessage }}
      <v-btn
        color="black"
        text
        @click="badData = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
    import allLocales from "@fullcalendar/core/locales-all";
    import Employee from './index.js'
    import DatePicker from '../datePicker';

    let selectId = ""

    export default {
        components: {
            DatePicker,
            FullCalendar // make the <FullCalendar> tag available
        },
        data: () => {
            return {
                selectDayNumber: {id: "2", value: "Любые"},
                selectDayOfWeek: [{id: "8", value: "Все дни"}],
                repeatDialog: {
                    dayNumber: [
                        {id: "2", value: "Любые"},
                        {id: "1", value: "Нечетные"},
                        {id: "0", value: "Четные"}
                    ],
                    weekDay: [
                        {id: "8", value: "Все дни"},
                        {id: "1", value: "Пн"},
                        {id: "2", value: "Вт"},
                        {id: "3", value: "Ср"},
                        {id: "4", value: "Чт"},
                        {id: "5", value: "Пт"},
                        {id: "6", value: "Сб"},
                        {id: "7", value: "Вс"}
                    ]
                },

                snacColor: "grey",
                snacMessage: "",
                badData: false,
                slider: 30,
                allLocales,

                editedItem: {
                    dayNumber: 2,
                    selectDay: [8],
                    repeatCount: '',
                    title: '',
                    startTime: '',
                    endTime: '',
                    eventId: ''
                },

                defaultItem: {
                    dayNumber: 2,
                    selectDay: [8],
                    repeatCount: '',
                    title: '',
                    startTime: '',
                    endTime: '',
                    eventId: ''
                },

                dialog: false,
                employeesList: [],
                employeeSelect: "",
                lastResource: "",
                date: new Date().toISOString().substr(0, 10),
                toDatePickerDate : '',
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

            select(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Employee.setScheduleEmployees(arg, calendarApi)
            },

            eventClick(info) {
                this.editedItem.startTime = new Date(info.event.start).toLocaleTimeString()
                this.editedItem.endTime = new Date(info.event.end).toLocaleTimeString()
                this.editedItem.eventId = info.event.id
                this.editedItem.title = info.event.title
                this.dialog = true
            },

            repeatEmployeeSchedule() {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Employee.repeatEmployeeSchedule(this.editedItem, this, calendarApi)
            },

            eventDrop(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Employee.eventResizeAndDrop(arg, calendarApi, this)
            },

            eventResize(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Employee.eventResizeAndDrop(arg, calendarApi, this)
            },

            close() {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.dialog = false
            },

            goToDates(date) {
                this.date = date
            },

            removeEmployeeSchedule() {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Employee.removeScheduleEmployee(this, this.editedItem.eventId, calendarApi)
            },

            datesRender(info){
                this.toDatePickerDate =  info.view.currentStart.toLocaleDateString()
            }
        },

        watch: {
            slider: function () {
                this.slotDuration = "00:" + this.slider
            },

            date: function () {
                let calendarApi = this.$refs.fullCalendar.getApi()
                calendarApi.gotoDate(this.date)
            },

            selectDayNumber: function () {
                this.editedItem.dayNumber = this.selectDayNumber
                console.log("selectDayNumber " + this.selectDayNumber)
            },

            selectDayOfWeek: function () {
                this.editedItem.selectDay = this.selectDayOfWeek
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

  .repeat_btn {
    padding-top: 25px;
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
