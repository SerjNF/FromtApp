<template xmlns="http://www.w3.org/1999/html">
  <div class='demo-app'>

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
        <date-picker @setCurrentDate="goToDates"></date-picker>
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
                  name="input-5-2"
                  label="Заметка"
                  value="Какая нить хрень про записываемого"
                  v-model="editedItem.msg"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
          <v-btn color="blue darken-1" text @click="addEvent" :disabled="false">Добавить</v-btn>
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
    import Schedule from './index.js'
    import DatePicker from '../datePicker';

    let selectEmployeeId = []

    export default {
        components: {

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
                    startTime: "",
                    endTime: "",
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
                },
                defaultItem: {
                    startTime: "",
                    endTime: "",
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
                },

                dialog: false,
                employeesList: [],
                employeeSelect: [],
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
                console.log("setResource")
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
                // let endInfo = info.event.end;
                // let start = info.event.start.getTime() - 60000 * new Date().getTimezoneOffset();
                // let end = endInfo === null ? 0 : endInfo.getTime() - 60000 * new Date().getTimezoneOffset();
                //
                // this.editedItem.start = new Date(start).toISOString().slice(0, 16)
                // this.editedItem.end = endInfo === null ? "" : new Date(end).toISOString().slice(0, 16)
                //
                // this.editedItem.startTime = new Date(info.event.start.getTime())
                this.dialog = true
            },

            eventDrop(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Schedule.eventResizeAndDrop(arg, calendarApi)
            },

            eventResize(arg) {
                let calendarApi = this.$refs.fullCalendar.getApi()
                Schedule.eventResizeAndDrop(arg, calendarApi)
            },

            close() {
                this.selectClient = null
                this.editedItem = Object.assign({}, this.defaultItem)
                this.dialog = false
            },

            goToDates(date) {
                this.date = date
            },

            querySelections(val) {
                this.loading = true
                // Simulated ajax query
                Schedule.getClientListFiltered(val, this)
                setTimeout(() => {
                    this.items = this.clientList.filter(e => {
                        return (e.firstName || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1 ||
                            (e.lastName || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
                    })
                    this.loading = false
                }, 500)
            }
        },

        watch: {
            endTime: function () {
                let splitTime = this.endTime.split(":")
                this.editedItem.endTime = new Date(this.editedItem.endTime).setHours(splitTime[0])
                this.editedItem.endTime = new Date(this.editedItem.endTime).setMinutes(splitTime[1])
                console.log(new Date(this.editedItem.endTime).toLocaleTimeString())
            },

            startTime: function () {
                let splitTime = this.startTime.split(":")
                this.editedItem.startTime = new Date(this.editedItem.startTime).setHours(splitTime[0])
                this.editedItem.startTime = new Date(this.editedItem.startTime).setMinutes(splitTime[1])
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

        computed: {

            // startTime() {
            //     console.log(new Date(this.editedItem.startTime).toLocaleTimeString())
            //     return new Date(this.editedItem.startTime).toLocaleTimeString()
            // }
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
