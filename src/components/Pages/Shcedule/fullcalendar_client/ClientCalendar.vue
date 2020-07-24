<template xmlns="http://www.w3.org/1999/html">
  <div>

    <v-row>
      <v-col xl="10" lg="9" md="9" sm="12">

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
          :selectOverlap="false"
          :selectMirror="false"
          :businessHours="true"
          selectConstraint="businessHours"
          :custom-buttons="buttons"
          :header="{
        left: 'prev,next, today, interval',
        center: 'title',
        right: 'dayGridMonth,resourceTimeGridWeek,resourceTimeGridDay,listWeek'
      }"
          :refetch-resources-on-navigate="true"
          :plugins="calendarPlugins"
          :resources="resources"
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
        <date-picker :somedata="toDatePickerDate" @setCurrentDate="goToDates"></date-picker>
        <v-select
          v-model="employeeSelect"
          :items="employeesList"
          multiple
          @change="setResource()"
          item-text="fullName"
          label="Сотрудник"
          prepend-icon="assignment_ind"
          return-object>
        </v-select>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">Новая Запись</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-toolbar
                  light
                >
                  <v-toolbar-title>Поиск:</v-toolbar-title>
                  <v-autocomplete
                    v-model="selectClient"
                    :loading="loading"
                    :items="items"
                    :search-input.sync="search"
                    :item-text="fullName"
                    return-object
                    flat
                    hide-no-data
                    hide-details
                    label="Введите фамилию клиента..."
                    solo
                    prepend-icon="search"
                  ></v-autocomplete>
                </v-toolbar>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  prepend-icon="how_to_reg"
                  v-model="editedItem.lastName" label="Фамилия"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  prepend-icon="how_to_reg"
                  v-model="editedItem.firstName" label="Имя"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  prepend-icon="how_to_reg"
                  aria-required="true"
                  v-model="editedItem.middleName" label="Отчество"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-tooltip top="">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      type="tel"
                      prepend-icon="phone"
                      v-on="on"
                      v-model="editedItem.clientPhone" label="Телефон "></v-text-field>
                  </template>
                  <span>Пример: +71234567890</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menuStartEvent"
                  v-model="startMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="startTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startTime"
                      label="Начало приема"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="startMenu"
                    v-model="startTime"
                    :scrollable="true"
                    @click:minute="$refs.menuStartEvent.save(startTime)"
                  ></v-time-picker>
                </v-menu>
                <v-spacer></v-spacer>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menuEndEvent"
                  v-model="endMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="endTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endTime"
                      label="Окончание приема"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="endMenu"
                    v-model="endTime"
                    :scrollable="true"
                    @click:minute="$refs.menuEndEvent.save(endTime)"
                  ></v-time-picker>
                </v-menu>
                <v-spacer></v-spacer>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  outlined
                  auto-grow
                  rows="1"
                  row-height="15"
                  label="Заметка"
                  v-model="editedItem.msg"

                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="addEvent" :disabled="false">Добавить</v-btn>
          <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="clientDialog" max-width="1000px">
      <!--      <v-card>-->
      <!--        <v-card-title>-->
      <!--          Title-->
      <!--        </v-card-title>-->
      <!--        <v-card-text>-->
            <RecordDetails :clientInfo="clientScheduleId" :apiCalendar="apiCalendar" @setClientDialog="clientDialogClose" @setSnackBar="snacStatusChange"></RecordDetails>
      <!--        </v-card-text>-->
      <!--        <v-card-actions>-->
      <!--          <div class="flex-grow-1"></div>-->
      <!--          <v-btn color="blue darken-1" text @click="close2">Закрыть</v-btn>-->
      <!--          <v-btn color="blue darken-1" text @click="" :disabled="false">Добавить</v-btn>-->
      <!--        </v-card-actions>-->
      <!--      </v-card>-->
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
    import allLocales from "@fullcalendar/core/locales-all"
    import Schedule from './index.js'
    import DatePicker from '../datePicker'
    import RecordDetails from "./component/RecordDetails"

    let selectEmployeeId = []

    export default {
        components: {
            RecordDetails,

            DatePicker,
            FullCalendar // make the <FullCalendar>
        },
        data: () => {
            return {
                time: null,
                startMenu: false,
                startTime: null,
                endTime: null,
                endMenu: false,
                snacColor: "grey",
                snacMessage: "",
                badData: false,
                items: [],
                clients: [],
                search: null,
                selectClient: null,
                loading: false,

                slider: 30,
                allLocales,
                buttons: {
                    interval: {
                        text: 'custom!',
                        click: () => console.log(this)
                    }
                },
                editedItem: {
                    start: '',
                    end: '',
                    resourcesId: '',
                    msg: '',
                    title: '',
                    clientId: '-1',
                    lastName: '',
                    firstName: '',
                    middleName: '',
                    clientPhone: '',
                    eventId: ''
                },
                defaultItem: {
                    start: '',
                    end: '',
                    resourcesId: '',
                    msg: '',
                    title: '',
                    clientId: '-1',
                    lastName: '',
                    firstName: '',
                    middleName: '',
                    clientPhone: '',
                    eventId: ''
                },

                dialog: false,
                clientDialog: false,
                clientScheduleId: "",
                apiCalendar:"",
                employeesList: [],
                employeeSelect: [],
                lastResource: "",
                date: new Date().toISOString().substr(0, 10),
                toDatePickerDate: '',
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
                defaultView: 'resourceTimeGridWeek',
                calendarWeekends: true,
                resources: function (fetchInfo, successCallback, failureCallback) {
                    Schedule.getResources(fetchInfo, selectEmployeeId, successCallback)
                },
                events: function (info, successCallback, failureCallback) {
                    Schedule.getEvetns(info, selectEmployeeId, successCallback)
                },
                fullName: function (val) {
                    let mn = val.middleName !== null ? val.middleName : ''
                    return val.lastName + ' ' + val.firstName + ' ' + mn
                }
            }
        },
        mounted() {
            this.initialization()

        },

        methods: {
            setResource() {
                selectEmployeeId = []
                this.employeeSelect.forEach(function (item, i) {
                    selectEmployeeId.push(item.id)
                })
                let calendarApi = this.$refs.fullCalendar.getApi()
                calendarApi.refetchResources()
                calendarApi.refetchEvents()
            },

            initialization() {
                Schedule.initialize(this)
            },

            select(arg) {
                Schedule.setScheduleClient(this, arg,)
            },

            addEvent() {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Schedule.addEvent(this, calendarApi)
            },

            eventClick(info) {
                this.clientScheduleId = info
                this.apiCalendar = this.$refs.fullCalendar.getApi()
                this.clientDialog = true
            },

            eventDrop(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Schedule.eventResizeAndDrop(arg, calendarApi, this)
            },

            eventResize(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Schedule.eventResizeAndDrop(arg, calendarApi, this)
            },

            close() {
                this.selectClient = null
                this.editedItem = Object.assign({}, this.defaultItem)
                this.dialog = false
            },

            clientDialogClose() {
                this.clientDialog = false
            },

            snacStatusChange(data){
                this.badData = data.badData
                this.snacMessage = data.snacMessage
                this.snacColor = data.snacColor
            },

            goToDates(date) {
                this.date = date
            },

            querySelections(val) {
                this.loading = true
                Schedule.getClientListFiltered(val, this)
                setTimeout(() => {
                    this.items = this.clientList.filter(e => {
                        return (e.firstName || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1 ||
                            (e.lastName || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
                    })
                    this.loading = false
                }, 500)
            },

            datesRender(info) {
                this.toDatePickerDate = info.view.currentStart.toLocaleDateString()
            }
        },

        watch: {
            endTime: function () {
                let splitTime = this.endTime.split(":")
                let date = new Date(this.editedItem.end)
                date.setHours(splitTime[0])
                date.setMinutes(splitTime[1])
                if (date <= this.editedItem.start) {
                    Schedule.batTime(this, "Неверное время окончания приёма")
                } else {
                    this.editedItem.end = new Date(date).getTime()
                }
            },

            startTime: function () {
                let splitTime = this.startTime.split(":")
                let date = new Date(this.editedItem.start)
                date.setHours(splitTime[0])
                date.setMinutes(splitTime[1])
                if (date >= this.editedItem.end) {
                    Schedule.batTime(this, "Неверное время начала приёма")
                } else {
                    this.editedItem.start = new Date(date).getTime()
                }
            },

            selectClient: function () {
                if (this.selectClient !== null) {
                    this.editedItem.clientId = this.selectClient.id
                    this.editedItem.firstName = this.selectClient.firstName
                    this.editedItem.lastName = this.selectClient.lastName
                    this.editedItem.middleName = this.selectClient.middleName
                    this.editedItem.clientPhone = this.selectClient.clientPhone
                }
            },
            slider: function () {
                this.slotDuration = "00:" + this.slider
            },

            date: function () {
                let calendarApi = this.$refs.fullCalendar.getApi()
                calendarApi.gotoDate(this.date)
            },

            search(val) {
                val && val !== this.select && this.querySelections(val)
            },
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
