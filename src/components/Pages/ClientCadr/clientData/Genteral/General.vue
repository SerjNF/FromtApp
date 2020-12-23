<template>

    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <v-btn :disabled="(isCard && isClient)" color="primary" dark class="mb-2" @click="save">Сохранить</v-btn>
          </v-col>

          <v-col cols="6" sm="6" md="6" class="text-right">
            <span>Карта номер: {{clientData.clientCardDto.id}}</span>
          </v-col>
        </v-row>


      </v-card-title>
      <v-card-text class="elevation-5">

        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="clientData.clientDto.lastName"
              prepend-icon="how_to_reg"
              label="Фамилия"></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="clientData.clientDto.firstName"
              prepend-icon="how_to_reg"
              label="Имя"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="clientData.clientDto.middleName"
              prepend-icon="how_to_reg"
              aria-required="true"
              label="Отчество"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              prepend-icon="calendar_today"
              type="date"
              label="День рождения"
              v-model="clientData.clientCardDto.birthday"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-select
              v-model="clientData.clientCardDto.gender"
              :items="genders"
              item-text="text"
              item-value="key"
              label="Пол"
              prepend-icon="how_to_reg"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-tooltip top="">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :error="pv"
                  v-model="clientData.clientDto.clientPhone"
                  type="tel"
                  prepend-icon="phone"
                  v-on="on"
                  label="Телефон "></v-text-field>
              </template>
              <span>Пример: +71234567890</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              disabled
              prepend-icon="how_to_reg"
              label="Добавил/Изменил"
              v-model="clientData.clientDto.user"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Адреса
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  prepend-icon="note"
                  v-model="clientData.clientCardDto.address"
                  auto-grow
                  rows="1"
                  row-height="15"
                  label="Адрес проживания">
                </v-textarea>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
                  prepend-icon="calendar_today"
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


</template>

<script>
    import General from "./index"
    import objecktCompare from "@/plugins/objeckCompare";
    import phoneValid from "@/plugins/phoneValidate";

    export default {
        name: "ClientData",
        props: ['clientId'],

        data: () => {
            return {
                isClient: true,
                isCard: true,
                pv: true,
                items: ['Ж', 'М'],
                count: 0,
                clientData: {
                    clientDto: {
                        id: '',
                        firstName: '',
                        lastName: '',
                        middleName: '',
                        clientPhone: '',
                        createDate: ''
                    },
                    clientCardDto: {
                        id: '',
                        birthday: '',
                        gender: '',
                        passportSeries: '',
                        passportNumber: '',
                        passportDate: '',
                        passportOrder: '',
                        jod: '',
                        position: '',
                        address: ''
                    }
                },
                clientDefData: {
                    clientDto: {
                        id: '',
                        firstName: '',
                        lastName: '',
                        middleName: '',
                        clientPhone: '',
                        createDate: ''
                    },
                    clientCardDto: {
                        id: '',
                        birthday: '',
                        gender: '',
                        passportSeries: '',
                        passportNumber: '',
                        passportDate: '',
                        passportOrder: '',
                        jod: '',
                        position: '',
                        address: ''
                    }
                },
                genders: [
                    {key: 'MALE', text: 'Муж'},
                    {key: 'FEMALE', text: 'Жен'},
                ],
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

            check() {
                this.count = this.count + 1
                if (this.count > 1) {
                }
            },

            save() {
                General.save(this)
            },

        },

        watch: {
            "clientData.clientDto.lastName": function () {
                document.title = this.clientData.clientDto.lastName
            },

            "clientData.clientDto": {
                handler: function (val, oldVal) {
                    if (this.count < 1) {
                        this.count += 1
                    } else {
                        this.isClient = objecktCompare.isEquivalent(this.clientData.clientDto, this.clientDefData.clientDto)
                    }
                },
                deep: true
            },

            "clientData.clientCardDto": {
                handler: function (val, oldVal) {
                    if (this.count < 1) {
                        this.count += 1
                    } else {
                        this.isCard = objecktCompare.isEquivalent(this.clientData.clientCardDto, this.clientDefData.clientCardDto)
                    }
                },
                deep: true
            },

            'clientData.clientDto.clientPhone': function () {
                this.pv = true
                this.clientData.clientDto.clientPhone = this.clientData.clientDto.clientPhone.replace(/^8/, "+7-")
                this.clientData.clientDto.clientPhone = this.clientData.clientDto.clientPhone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1' + "-" + '$2' + "-" + '$3' + "-" + '$4')
                let length = this.clientData.clientDto.clientPhone
                if (length === 6 || length === 10 || length === 13) {
                    this.clientData.clientDto.clientPhone = this.clientData.clientDto.clientPhone + "-"
                }

                if (phoneValid.phoneValidate(this.clientData.clientDto.clientPhone)) {
                    this.pv = false
                }
            },
        }
    }
</script>

<style scoped>

</style>
