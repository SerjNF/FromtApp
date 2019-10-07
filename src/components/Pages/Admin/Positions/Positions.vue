<template>
  <div>
    <v-container fluid>

      <v-data-iterator
        :items="desserts"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar flat color="white">
            <v-toolbar-title>Список должностей</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <div class="flex-grow-1"></div>

            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Новая должность</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          prepend-icon="how_to_reg"
                          v-model="editedItem.positions" label="Должность"></v-text-field>
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

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title><h4>{{ item.positionName }}</h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Сотрудников в должности:</v-list-item-content>
                    <v-list-item-content class="align-end v-list-item_data">{{ item.countEmployees }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>№ должности:</v-list-item-content>
                    <v-list-item-content class="align-end v-list-item_data">{{ item.id }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Действие:</v-list-item-content>
                    <v-list-item-content class="align-end v-list-item_data">
                      <v-icon
                        class="align-end"
                        small
                        @click="deleteItem(item)"
                      >
                        delete
                      </v-icon>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>

<!--        <foo :itemlength="desserts.length"></foo>-->
        <template v-slot:footer>
          <footerr :itemLength="desserts.length"
                   @changePage="changePageNumber"
                   @changeItemPerPage="changeItemPerPag"></footerr>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Обновить</v-btn>
        </template>
      </v-data-iterator>
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
    </v-container>
  </div>
</template>

<script>
    import axiosImt from "axios";
    import Positions from './index.js'
    import Footer from '../Footer/Footer.vue'

    const axInst = axiosImt.create({
        baseURL: `http://${window.location.hostname}:8080/api/v1`,
        proxyHeaders: false,
        credentials: false
    })

    export default {
        components: {
            footerr: Footer,
        },
        data: () => ({
            page: 1,
            itemsPerPage: 10,
            badData: false,
            snacMessage: '',
            snacColor: 'green',
            dialog: false,
            headers: [
                {
                    text: '№',
                    align: 'left',
                    sortable: true,
                    value: 'id',
                },
                {text: 'Должность', value: 'positionName'},
                {text: 'Число сотрудников в должности', value: 'countEmployees'},
                {text: 'Действия', value: 'action', sortable: false},
            ],

            desserts: [],
            editedItem: {
                positions: '',
            },
            defaultItem: {
                positions: '',
            },
            positionsList: [],
            formTitle: 'Новая должность'

        }),
        computed: {
            isValid() {
                return this.editedItem.positions === ''
            },

            numberOfPages() {
                return Math.ceil(this.desserts.length / this.itemsPerPage)
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize()
        },

        methods: {
            changePageNumber(p){
                this.page = p
            },

            changeItemPerPag(i){
                this.itemsPerPage = i
            },

            initialize() {
                Positions.initialize(this, axInst)
            },


            deleteItem(item) {
                confirm('Удалить пользователя, логин: ' + item.login + ' ?') && Positions.delPosition(this, item, axInst)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                }, 300)
            },

            save() {
                Positions.savePosition(this, this.editedItem, axInst)
                this.close()
            },
        },
    }
</script>

<style scoped>
  .v-list-item__content {
    flex: auto;
  }

  .v-list-item_data {
    flex: initial;
  }
</style>
