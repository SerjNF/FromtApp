<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Список пользователей</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Новый пользователь</v-btn>
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
                            v-model="editedItem.phone" label="Телефон "></v-text-field>
                        </template>
                        <span>Пример: +71234567890</span>
                      </v-tooltip>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.role"
                        :items="roles"
                        item-text="text"
                        item-value="key"
                        label="Доступ"
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
                      <v-text-field
                        type="password"
                        prepend-icon="how_to_reg"
                        aria-required="true"
                        v-model="editedItem.password" label="Пароль"></v-text-field>
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
          small
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Обновить</v-btn>
      </template>

      <template v-slot:item.role="{ item }">
        <v-chip :color="getRole(item.role).color" dark>{{ getRole(item.role).role }}</v-chip>
      </template>

      <template v-slot:item.state="{ item }">
        <v-chip :color="getState(item.state).color" dark>{{ getState(item.state).state }}</v-chip>
      </template>
      <template v-slot:footer>
        <footerr :itemLength="users.length"
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

    import User from './index.js'
    import Footer from '../Footer/Footer.vue'

    export default {
        components: {
            footerr: Footer,
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
                {text: 'Логин', value: 'login'},
                {text: 'Права доступа', value: 'role'},
                {text: 'Стутус', value: 'state'},
                {text: 'Действия', value: 'action', sortable: false},
            ],
            users: [],
            phoneValid: false,
            editedIndex: -1,
            editedItem: {
                id: -1,
                lastName: '',
                firstName: '',
                middleName: '',
                phone: '',
                password: '',
                role: '',
                state: '',
            },
            defaultItem: {
                id: -1,
                lastName: '',
                firstName: '',
                middleName: '',
                phone: '',
                password: '',
                role: '',
                state: '',
            },
            roles: [
                {key: 'ADMIN', text: 'Полный'},
                {key: 'USER', text: 'Частичный (Администратор)'},
                {key: 'PERSONAL', text: 'Ограниченный'}
            ],
            states: [
                {key: 'ACTIVE', text: 'Разрешён'},
                {key: 'BANNED', text: 'Заблокирован'},
                // {key: '', text: 'Ограниченный'}
            ]
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Новый пользователь' : 'Редактировать профиль'
            },
            isValid() {
                //	if (this.editedIndex === -1) {
                let res = (this.editedItem.lastName === '' ||
                    this.editedItem.firstName === '' ||
                    this.editedItem.role === '' ||
                    this.editedItem.state === '') ||
                    this.editedItem.password === '' ||
                    this.isPhoneValid()
                return res
            },

            numberOfPages() {
                return Math.ceil(this.users.length / this.itemsPerPage)
            },

        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        mounted() {
            setTimeout(() => {
                this.initialize()
            }, 500)
        },

        methods: {
            changePageNumber(p) {
                this.page = p
            },

            changeItemPerPag(i) {
                this.itemsPerPage = i
            },

            getRole(role) {
                if (role === 'ADMIN') {
                    return {role: 'Полный доступ', color: 'orange'}
                } else if (role === 'USER') {
                    return {role: 'Частичный (Администратор)', color: 'blue'}
                } else {
                    return {role: 'Ограниченный', color: 'grey'}
                }
            },

            getState(state) {
                if (state === 'ACTIVE') {
                    return {state: 'Разрешён', color: 'green'}
                } else {
                    return {state: 'Заблокирован', color: 'red'}
                }
            },

            isPhoneValid() {
                let phoneRegex = /^([+]7|8)[0-9]{3}[0-9]{3}[0-9]{4}$/;
                return this.editedItem.phone.search(phoneRegex) !== 0
            },

            initialize() {
                this.users = []
                User.initialization(this)
                //       let token = store.state.user.User.token

            },

            editItem(item) {
                this.editedIndex = this.users.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.editedItem.password = ''
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.users.indexOf(item)
                confirm('Удалить пользователя, логин: ' + item.login + ' ?') && User.delUser(this, item)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                //       if (this.editedIndex > -1) {
                //       	User.saveUser(this, this.editedItem, axInst)
                //  Object.assign(this.desserts[this.editedIndex], this.editedItem)
                //       } else {
                User.saveUser(this, this.editedItem)
                //       }
                this.close()
            },

            nextPage() {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage() {
                if (this.page - 1 >= 1) this.page -= 1
            },
            updateItemsPerPage(number) {
                this.itemsPerPage = number
            },
        },
    }
</script>

<style scoped>

</style>
