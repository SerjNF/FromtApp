<template>
  <div>
    <v-content
      class="ml-3 mr-3">
      <v-data-table
        @click:row="onClickRow"
        :headers="headers"
        :items="clientList"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Список клиентов</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <div class="flex-grow-1"></div>

          </v-toolbar>
        </template>
        <template v-slot:item.createDate="{item}">
          <v-chip color="primary" outlined>{{ getDate(item) }}</v-chip>
          <!--        <v-text-field :disabled="true" :value="getDate(item)"></v-text-field>-->
        </template>
        <!--      <template v-slot:item.action="{ item }">-->
        <!--        <v-icon-->
        <!--          small-->
        <!--          class="mr-2"-->
        <!--          @click="editItem(item)"-->
        <!--        >-->
        <!--          edit-->
        <!--        </v-icon>-->
        <!--        <v-icon-->
        <!--          small-->
        <!--          @click="deleteItem(item)"-->
        <!--        >-->
        <!--          delete-->
        <!--        </v-icon>-->
        <!--      </template>-->

        <!--      <template v-slot:no-data>-->
        <!--        <v-btn color="primary" @click="initialize">Обновить</v-btn>-->
        <!--      </template>-->

        <template v-slot:footer>
          <my-footer :itemLength="clientList.length"
                     @changePage="changePageNumber"
                     @changeItemPerPage="changeItemPerPag"></my-footer>
        </template>
      </v-data-table>
    </v-content>
  </div>
</template>

<script>
    import ClientList from './index.js'
    import Footer from '../../Admin/Footer/Footer.vue'

    export default {
        name: 'ClientList',

        components: {
            MyFooter: Footer
        },

        data: () => ({
            page: 1,
            itemsPerPage: 10,
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
                {text: 'Телефон', value: 'clientPhone'},
                {text: 'Время создания', value: 'createDate'},
            ],

            clientList: [],
        }),

        mounted() {
            document.title = "Список клиентов"
            this.initialize()
        },

        methods: {
            changePageNumber(p) {
                this.page = p
            },

            changeItemPerPag(i) {
                this.itemsPerPage = i
            },

            initialize() {
                setTimeout(() => {
                    ClientList.initialization(this)
                }, 400)
            },

            onClickRow(row) {
                let routeData = this.$router.resolve({name: 'Card', params: {id: row.id}});
                window.open(routeData.href, '_self');
            },

            getDate(date) {
                return new Date(date.createDate).toLocaleDateString()
            }
        },
    }
</script>

<style scoped>

</style>
