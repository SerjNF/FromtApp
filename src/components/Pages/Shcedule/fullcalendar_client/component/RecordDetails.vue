<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">{{editedItem.title}}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
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


            <v-col cols="12" sm="6" md="4">
              <v-text-field
                disabled
                prepend-icon="how_to_reg"
                v-model="editedItem.user" label="Внес/Изменил"></v-text-field>
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

            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="editedItem.state"
                :items="states"
                item-text="text"
                item-value="key"
                label="Статус приёма"
                prepend-icon="assignment_ind"
                return-value>
              </v-select>
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
        <v-btn color="blue darken-1" text @click="save" :disabled="!changed">Сохранить</v-btn>
        <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
    import RecordDetails from './index.js'

    export default {
        props: ['clientInfo', 'apiCalendar'],
        name: "ClientTime",
        data: () => {
            return {
                badData: false,
                snacMessage: '',
                snacColor: 'green',
                time: null,
                startMenu: false,
                startTime: null,
                endMenu: false,
                endTime: null,
                states: [
                    {key: 'RECEPTION_CANCELED', text: 'Отменен'},
                    {key: 'RECEPTION_CONFIRMED', text: 'Подтвержден'},
                    {key: 'RECEPTION_DELETE', text: 'Удален'},
                    {key: 'RECEPTION_NEW', text: 'Новая запись'}
                ],
                editedItem: {
                    eventId: '',
                    resourcesId: '',
                    clientId: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    clientPhone: '',
                    title: '',
                    start: '',
                    end: '',
                    msg: '',
                    state: '',
                    user: ''
                },

                defaultItem: {
                    eventId: '',
                    resourcesId: '',
                    clientId: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    clientPhone: '',
                    title: '',
                    start: '',
                    end: '',
                    msg: '',
                    state: '',
                    user: ''
                },
                changed: false,
            }
        },

        methods: {
            close() {
                this.$emit('setClientDialog', false);
            },

            save() {
                RecordDetails.changeClientRecordDetails(this.apiCalendar, this)
                this.defaultItem = Object.assign({}, this.editedItem)
                this.changed = false
            },
        },
        mounted() {
            RecordDetails.getClientRecordDetails(this, this.clientInfo.event._def.publicId)
        },

        watch: {
            clientInfo: function () {
                RecordDetails.getClientRecordDetails(this, this.clientInfo.event._def.publicId)
            },

            endTime: function () {
                let splitTime = this.endTime.split(":")
                let date = new Date(this.editedItem.end)
                date.setHours(splitTime[0])
                date.setMinutes(splitTime[1])
                if (date <= this.editedItem.start) {
                    RecordDetails.batTime(this, "Неверное время окончания приёма")
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
                    RecordDetails.batTime(this, "Неверное время начала приёма")
                } else {
                    this.editedItem.start = new Date(date).getTime()
                }
            },

            "editedItem.state": function () {
                this.changed = (this.editedItem.state !== this.defaultItem.state)
            },
            "editedItem.start": function () {
                this.changed = (this.editedItem.start !== this.defaultItem.start)
            },
            "editedItem.end": function () {
                this.changed = (this.editedItem.end !== this.defaultItem.end)
            },
            "editedItem.firstName": function () {
                this.changed = (this.editedItem.firstName !== this.defaultItem.firstName)
            },
            "editedItem.middleName": function () {
                this.changed = (this.editedItem.middleName !== this.defaultItem.middleName)
            },
            "editedItem.clientPhone": function () {
                this.changed = (this.editedItem.clientPhone !== this.defaultItem.clientPhone)
            },
            "editedItem.msg": function () {
                this.changed = (this.editedItem.msg !== this.defaultItem.msg)
            },
            "editedItem.lastName": function () {
                this.changed = (this.editedItem.lastName !== this.defaultItem.lastName)
            },

            badData: function () {
                this.$emit('setSnackBar', {
                    "badData": true,
                    "snacMessage": this.snacMessage,
                    "snacColor": this.snacColor
                })
            }
        }
    }
</script>

<style scoped>

</style>
