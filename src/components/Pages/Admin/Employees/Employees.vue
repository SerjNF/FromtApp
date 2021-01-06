<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer

      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Список сотрудников</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Новый сотрудник</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
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

                    <v-col cols="12" sm="6" md="4">
                      <v-tooltip top="">
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            type="tel"
                            prepend-icon="contact_phone"
                            v-on="on"
                            v-model="editedItem.phone" label="Телефон"></v-text-field>
                        </template>
                        <span>Пример: +71234567890</span>
                      </v-tooltip>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.positions"
                        :items="positionsList"
                        item-text="positionName"
                        item-value="id"
                        label="Должности"
                        prepend-icon="assignment_ind"
                        multiple
                        return-value>
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.scheduleView"
                        :items="scheduleViews"
                        item-text="text"
                        item-value="key"
                        label="График работы"
                        prepend-icon="assignment_ind"
                        return-value>
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.state"
                        :items="states"
                        item-text="text"
                        item-value="key"
                        label="Статус аккаунта"
                        prepend-icon="assignment_ind"
                        return-value>
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.state"
                        :items="states"
                        item-text="text"
                        item-value="key"
                        label="Статус аккаунта"
                        prepend-icon="assignment_ind"
                        return-value>
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <chrome-picker v-model="editedItem.color" @input="updateValue(editedItem.color)"/>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
                <v-btn color="blue darken-1" text @click="save" :disabled="isValid">Сохранить</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          medium
          class="mr-2"
          @click="editItem(item)"
          color="blue darken-1"
        >
          edit
        </v-icon>

      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Обновить</v-btn>
      </template>

      <template v-slot:item.scheduleView="{ item }">
<!--        <v-chip :color="getScheduleView(item.scheduleView).color">-->
          {{ getScheduleView(item.scheduleView).scheduleView
          }}
<!--        </v-chip>-->
      </template>

      <template v-slot:item.state="{ item }">
        <v-chip :color="getState(item.state).color" dark>{{ getState(item.state).state }}</v-chip>
      </template>

      <template v-slot:item.color="{ item }">
        <v-chip :color="item.color" dark>Цветовая сх.</v-chip>
      </template>

      <template v-slot:item.positions="{ item }">
        {{ getPositions(item.positions)}}
      </template>
      <template v-slot:footer>
        <footerr :itemLength="desserts.length"
                 :startItemPerPage=itemsPerPage
                 @changePage="changePageNumber"
                 @changeItemPerPage="changeItemPerPag"></footerr>
      </template>
    </v-data-table>
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
    import Employee from './index.js'
    import Footer from '../Footer/Footer.vue'
    import {Chrome} from 'vue-color'

    export default {
        components: {
            footerr: Footer,
            'chrome-picker': Chrome,
        },
        data: () => ({
            page: 1,
            itemsPerPage: 20,
            badData: false,
            snacMessage: '',
            snacColor: '',
            dialog: false,
            headers: [
                {
                    text: '№',
                    align: 'left',
                    sortable: true,
                    value: 'id',
                },
                {text: 'Фамилия', value: 'lastName'},
                {text: 'Имя', value: 'firstName'},
                {text: 'Отчество', value: 'middleName'},
                {text: 'Телефон', value: 'phone'},
                {text: 'Должности', value: 'positions'},
                {text: 'График работы', value: 'scheduleView'},
                {text: 'Стутус', value: 'state'},
                {text: 'Оплата', value: 'state'},
                {text: 'Цветовая схема', value: 'color'},
                {text: 'Действия', value: 'action', sortable: false},
            ],

            desserts: [],
            phoneValid: false,
            editedIndex: -1,
            editedItem: {
                id: -1,
                lastName: '',
                firstName: '',
                middleName: '',
                phone: '',
                positions: '',
                scheduleView: '',
                state: '',
                color: ''
            },
            defaultItem: {
                id: -1,
                lastName: '',
                firstName: '',
                middleName: '',
                phone: '',
                positions: '',
                scheduleView: '',
                state: '',
                color: ''
            },
            scheduleViews:
                [
                    {key: 'WORKSCHEDULE', text: 'Расписание'},
                    {key: 'WORKSHIFT', text: 'Смена'}
                ],
            states: [
                {key: 'ACTIVE', text: 'Разрешён'},
                {key: 'BANNED', text: 'Заблокирован'},
                {key: 'DELETED', text: 'Удален'}
            ],
            positionsList: [],
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Новый сотрудник' : 'Редактировать профиль'
            },

            isValid() {
                // let res = (this.editedItem.lastName === '' ||
                //     this.editedItem.firstName === '' ||
                //     this.editedItem.role === '' ||
                //     this.editedItem.state === '') ||
                //     this.editedItem.password === '' ||
                //     this.isPhoneValid()
                return false
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        mounted() {
            this.initialize()
        },

        methods: {
            updateValue(ob) {
                this.editedItem.color = ob.hex
            },

            changePageNumber(p) {
                this.page = p
            },

            changeItemPerPag(i) {
                this.itemsPerPage = i
            },

            getScheduleView(scheduleView) {
                if (scheduleView === 'WORKSCHEDULE') {
                    return {scheduleView: 'Расписание', color: 'white'}
                } else {
                    return {scheduleView: 'График', color: 'white'}
                }
            },

            getPositions(positions) {
                let posString = ''
                positions.forEach((pos) => {
                    posString += pos.positionName + " "
                })
                return posString
            },

            getState(state) {
                if (state === 'ACTIVE') {
                    return {state: 'Разрешён', color: 'green'}
                } else if (state === 'BANNED') {
                    return {state: 'Заблокирован', color: 'orange'}
                } else {
                    return {state: 'Удалён', color: 'black'}
                }
            },

            isPhoneValid() {
                let phoneRegex = /^([+]7|8)[0-9]{3}[0-9]{3}[0-9]{4}$/;
                return this.editedItem.phone.search(phoneRegex) !== 0
            },

            initialize() {
                setTimeout(() => {
                    Employee.initialize(this)
                    Employee.getPositions(this)
                }, 500)
            },

            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.editedItem.positions = []
                item.positions.forEach((pos) => {
                    this.editedItem.positions.push(pos.id)
                })
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.desserts.indexOf(item)
                confirm('Удалить пользователя, логин: ' + item.login + ' ?') && Employee.delUser(this, item)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                Employee.saveEmployee(this, this.editedItem)
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>
