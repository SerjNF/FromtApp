<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-card>

      <v-card-title>
        <!--        <span class="headline">{{editedItem.title}}</span>-->
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :readonly="editedItem.clientCardId > 0"
                prepend-icon="how_to_reg"
                v-model="editedItem.lastName" label="Фамилия"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :readonly="editedItem.clientCardId > 0"
                prepend-icon="how_to_reg"
                v-model="editedItem.firstName" label="Имя"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :readonly="editedItem.clientCardId > 0"
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
                    :error="pv"
                    :readonly="editedItem.clientCardId > 0"
                    type="tel"
                    prepend-icon="phone"
                    v-on="on"
                    v-model="editedItem.clientPhone" label="Телефон "></v-text-field>
                </template>
                <span>Пример: +7-123-456-78-90</span>
              </v-tooltip>
            </v-col>


            <!--            <v-col cols="12" sm="6" md="4">-->
            <!--              <v-text-field-->
            <!--                disabled-->
            <!--                prepend-icon="how_to_reg"-->
            <!--                v-model="editedItem.user" label="Внес/Изменил"></v-text-field>-->
            <!--            </v-col>-->

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
                prepend-icon="notes"
                outlined
                auto-grow
                rows="1"
                row-height="15"
                label="Заметка"
                v-model="editedItem.msg"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <span class="pl-3">Внес/Изменил: {{editedItem.user}}</span>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn color="blue darken-1" text @click="openClientCard">{{buttonCardName}}</v-btn>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="save" :disabled="!changed">Сохранить</v-btn>
        <!--<v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>-->
      </v-card-actions>
    </v-card>
    <!--<v-dialog v-model="orderDialog" max-width="600px" transition="dialog-bottom-transition"-->
              <!--hide-overlay-->
              <!--persistent-->
    <!--&gt;-->
      <!--<current-order :scheduleId="editedItem.eventId"></current-order>-->
    <!--</v-dialog>-->
  </div>
</template>

<script>
  import RecordDetails from './index.js'
  import objecktCompare from "@/plugins/objeckCompare";
  import phoneValid from "@/plugins/phoneValidate";
  import store from '@/store/index'
  import CurrentOrder from "../../../../Modules/currentOrder/currentOrder";

  export default {
    components: {CurrentOrder},
    props: ['clientInfo', 'apiCalendar'],
    name: "ClientTime",
    data: () => {
      return {
        pv: false,
        badData: false,
        snacMessage: '',
        snacColor: 'green',
        time: null,
        startMenu: false,
        startTime: null,
        endMenu: false,
        endTime: null,
        states: [
          {key: 'RECEPTION_CONFIRMED', text: 'Подтвержден'},
          {key: 'RECEPTION_START', text: 'На приёме'},
          {key: 'RECEPTION_OVER', text: 'Приём окончен'},
          {key: 'RECEPTION_CANCELED', text: 'Отменен'},
          {key: 'RECEPTION_DELETE', text: 'Удален'},
          {key: 'RECEPTION_NEW', text: 'Новая запись'},
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
          user: '',
          clientCardId: '',
          invoiceId: ''
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
          user: '',
          clientCardId: 0,
          invoiceId: 0
        },
        changed: false,
        count: 0
      }
    },

    methods: {

      save() {
        RecordDetails.changeClientRecordDetails(this.apiCalendar, this)
        this.defaultItem = Object.assign({}, this.editedItem)
        this.changed = false
      },

      openClientCard() {
        let fullName = this.editedItem.lastName + " " +
          this.editedItem.firstName.charAt(0) + ". " +
          (this.editedItem.middleName !== "" ? (this.editedItem.middleName.charAt(0) + ".") : "");
        store.dispatch('openCard/ADD_CARDTOLIST', {id: this.editedItem.clientId, name: fullName});
        let routeData = this.$router.resolve({name: 'Card', params: {id: this.editedItem.clientId}});

        window.open(routeData.href, '_blank');
        this.close()
      },

    },


    mounted() {
      RecordDetails.getClientRecordDetails(this, this.clientInfo)
    },

    watch: {
      'editedItem.clientPhone': function () {
        this.pv = true;
        this.editedItem.clientPhone = this.editedItem.clientPhone.replace(/^8/, "+7");
        this.editedItem.clientPhone = this.editedItem.clientPhone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1' + "-" + '$2' + "-" + '$3' + "-" + '$4');
        let length = this.editedItem.clientPhone.length
        if (length === 2 || length === 6 || length === 10 || length === 13) {
          this.editedItem.clientPhone = this.editedItem.clientPhone + "-"
        }
        if (phoneValid.phoneValidate(this.editedItem.clientPhone)) {
          this.pv = false;
        }
      },

      clientInfo: function () {
        RecordDetails.getClientRecordDetails(this, this.clientInfo);
      },

      endTime: function () {
        let splitTime = this.endTime.split(":");
        let date = new Date(this.editedItem.end);
        date.setHours(splitTime[0]);
        date.setMinutes(splitTime[1]);
        if (date <= this.editedItem.start) {
          RecordDetails.batTime(this, "Неверное время окончания приёма");
        } else {
          this.editedItem.end = new Date(date).getTime();
        }
      },

      startTime: function () {
        let splitTime = this.startTime.split(":");
        let date = new Date(this.editedItem.start);
        date.setHours(splitTime[0]);
        date.setMinutes(splitTime[1]);
        if (date >= this.editedItem.end) {
          RecordDetails.batTime(this, "Неверное время начала приёма");
        } else {
          this.editedItem.start = new Date(date).getTime();
        }
      },

      "editedItem": {
        handler: function (val, oldVal) {
          if (this.count < 1) {
            this.count += 1
          } else {
            this.changed = !objecktCompare.isEquivalent(this.editedItem, this.defaultItem)
          }
        },
        deep: true
      },

      badData: function () {
        this.$emit('setSnackBar', {
          "badData": true,
          "snacMessage": this.snacMessage,
          "snacColor": this.snacColor
        })
      }
    },

    computed: {
      buttonCardName() {
        return this.editedItem.clientCardId > 0 ? "Открыть карту слиента" : "Создать карту клиента"
      },
    }
  }
</script>

<style scoped>

</style>
