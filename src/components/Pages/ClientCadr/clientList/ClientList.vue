<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-content
      class="ml-3 mr-3">
      <v-data-table
        @click:row="onClickRow"
        :headers="headers"
        :items="clientList"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :custom-filter="filter"
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
            <v-text-field v-model="search" label="Начните вводить..." class="pt-5"></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:item.createDate="{item}">
          <v-chip color="primary" outlined>{{ getDate(item) }}</v-chip>
        </template>

        <template v-slot:footer>
          <my-footer :itemLength="clientList.length"
                     :startItemPerPage=itemsPerPage
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
            itemsPerPage: 15,
            search: '',
            headers: [
                {
                    text: '№',
                    align: 'left',
                    sortable: true,
                    value: 'clientCardId',
                },
                {text: 'Фамилия', value: 'lastName'},
                {text: 'Имя', value: 'firstName'},
                {text: 'Отчество', value: 'middleName'},
                {text: 'Телефон', value: 'clientPhone'},
                {text: 'Время создания', value: 'createDate'},
            ],

            clientList: [],
            clientListLoad: []
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
            },

            filter(value, search, item) {
                return value != null &&
                    search != null &&
                    typeof value === 'string' &&
                    value.toString().toLocaleLowerCase().indexOf(search.toString().toLocaleLowerCase()) !== -1
            },

        },
    }
</script>

<style scoped>

</style>
