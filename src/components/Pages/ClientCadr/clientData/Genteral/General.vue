<template>
  <div>
    <v-card >
      <v-card-title>
        <v-btn :disabled="(isCard && isClient)" color="primary" dark class="mb-2" @click="save">Сохранить</v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="clientData.clientDto.lastName"
              prepend-icon="how_to_reg"
              label="Фамилия"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="clientData.clientDto.firstName"
              prepend-icon="how_to_reg"
              label="Имя"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="clientData.clientDto.middleName"
              prepend-icon="how_to_reg"
              aria-required="true"
              label="Отчество"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Дата рождения"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1920-01-01"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="12" md="2">
            <v-select
              :items="items"
              label="Пол"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-tooltip top="">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="clientData.clientDto.clientPhone"
                  type="tel"
                  prepend-icon="phone"
                  v-on="on"
                  label="Телефон "></v-text-field>
              </template>
              <span>Пример: +71234567890</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Паспорт</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" sm="4" md="2">
                <v-text-field
                  type="number"
                  v-model="clientData.clientCardDto.passportSeries"
                  prepend-icon="how_to_reg"
                  label="Серия">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  type="number"
                  v-model="clientData.clientCardDto.passportNumber"
                  prepend-icon="how_to_reg"
                  label="Номер"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="3">
                <v-text-field
                  prepend-icon="date"
                  type="date"
                  label="Дата выдачи"
                  v-model="clientData.clientCardDto.passportDate"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  prepend-icon="note"
                  v-model="clientData.clientCardDto.passportOrder"
                  auto-grow
                  rows="1"
                  row-height="15"
                  label="Кем выдан">
                </v-textarea>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Данные о работе</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="clientData.clientCardDto.jod"
              prepend-icon="business"
              label="Место работы">
            </v-text-field>
            <v-text-field
              v-model="clientData.clientCardDto.position"
              prepend-icon="business"
              label="Должность">
            </v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-card>

  </div>
</template>

<script>
    import General from "./index"
    import objecktCompare from "@/plugins/objeckCompare";

    export default {
        name: "ClientData",
        props: ['clientId'],

        beforeMount() {

        },

        data: () => {
            return {
                isClient: true,
                isCard: true,
                items: ['Ж', 'М'],
                count: 0,
                clientData: {
                    clientDto: {
                        id: '',
                        firstName: '',
                        lastName: '',
                        middleName: '',
                        clientPhone: '',
                        createDate: ''},
                    clientCardDto: {
                        id: '',
                        birthday: '',
                        gender: '',
                        passportSeries: '',
                        passportNumber: '',
                        passportDate: '',
                        passportOrder: '',
                        jod: '',
                        position: ''
                    }
                },
                clientDefData: {
                    clientDto: {
                        id: '',
                        firstName: '',
                        lastName: '',
                        middleName: '',
                        clientPhone: '',
                        createDate: ''},
                    clientCardDto: {
                        id: '',
                        birthday: '',
                        gender: '',
                        passportSeries: '',
                        passportNumber: '',
                        passportDate: '',
                        passportOrder: '',
                        jod: '',
                        position: ''
                    }
                }
            }
        },

        created() {
            this.initialisation()
        },

        mounted() {

        },

        methods: {
            initialisation() {
                setTimeout(() => {
                    General.initialization(this, this.clientId)
                }, 0)
            },

            check (){
                this.count  = this.count + 1
                if (this.count > 1) {
                    console.log("change")
                }
            },

            save(){
              General.save(this.ClientData)
            }

        },

        watch: {
            "clientData.clientDto.lastName": function () {
                document.title = this.clientData.clientDto.lastName
            },

            "clientData.clientDto":  {
                handler: function (val, oldVal) {
                    if (this.count < 1) {
                        this.count += 1
                    } else {
                        this.isClient = objecktCompare.isEquivalent(this.clientData.clientDto, this.clientDefData.clientDto)
                    }
                },
                deep: true
            },

            "clientData.clientCardDto":  {
                handler: function (val, oldVal) {
                    if (this.count < 1) {
                        this.count += 1
                    } else {
                        this.isCard = objecktCompare.isEquivalent(this.clientData.clientCardDto, this.clientDefData.clientCardDto)
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
