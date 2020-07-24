<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">{{editedItem.title}}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">

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
                v-model="editedItem.message"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
        <!--        <v-btn color="blue darken-1" text @click="addEvent" :disabled="false">Добавить</v-btn>-->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
    import RecordDetails from './index.js'


    export default {
        props: ['clientInfo'],
        name: "ClientTime",
        data: () => {
            return {
                time: null,
                startMenu: false,
                startTime: null,
                endMenu: false,
                endTime: null,
                editedItem: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    clientPhone: '',
                    title: '',
                    start: '',
                    end: '',
                    message: '',
                    state: '',
                },
            }
        },

        methods: {
            close() {
                this.$emit('setClientDialog', this.date);
            }
        },
        mounted() {
            RecordDetails.getClientRecordDetails(this, this.clientInfo.event._def.publicId)
        },

        watch: {
            clientInfo: function () {
                RecordDetails.getClientRecordDetails(this, this.clientInfo.event._def.publicId)
            }
        }

    }
</script>

<style scoped>

</style>
