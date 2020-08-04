<template>
  <div>
    <v-data-table
      @click:row="onClickRow"
      :headers="headers"
      :items="historyList"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{client}}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

        </v-toolbar>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialisation">Обновить</v-btn>
      </template>

      <template v-slot:item.state="{ item }">
        <v-chip :color="item.backgroundColor" dark>{{ getState(item.state) }}</v-chip>
      </template>

      <template v-slot:item.day="{ item }">
        <v-chip color="white">{{ new Date(item.day).toLocaleDateString()}}</v-chip>
      </template>

      <template v-slot:item.start="{ item }">
        <v-chip color="white">{{ getTime(item.start)}}</v-chip>
      </template>

      <template v-slot:item.end="{ item }">
        <v-chip color="white">{{ getTime(item.end)}}</v-chip>
      </template>

      <template v-slot:footer>
        <footerr :itemLength="historyList.length"
                 @changePage="changePageNumber"
                 @changeItemPerPage="changeItemPerPag"></footerr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
    import Footer from '@/components/Pages/Admin/Footer/Footer.vue'
    import History from "./index"

    export default {
        name: "historyList",
        components: {
            footerr: Footer
        },
        props: ['clientId'],

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
                {text: 'День приема', value: 'day'},
                {text: 'Начало приема', value: 'start'},
                {text: 'Окончание приема', value: 'end'},
                {text: 'Заметка', value: 'message'},
                {text: 'Статус приема', value: 'state'},
                {text: 'Врач', value: 'employee'},
                {text: 'Внес/изменил', value: 'user'},
            ],

            historyList: [],

        }),

        methods: {
            initialisation (){
                History.initialization(this, this.clientId)
            },

            changePageNumber(p) {
                this.page = p
            },

            changeItemPerPag(i) {
                this.itemsPerPage = i
            },

            getState(state) {
                if (state === 'RECEPTION_CANCELED') {
                    return 'Отменен'
                } else if (state === 'RECEPTION_CONFIRMED') {
                    return 'Подтвержден'
                }  else if (state === 'RECEPTION_DELETE') {
                    return 'Удален'
                }  else if (state === 'RECEPTION_NEW') {
                    return 'Новая запись'
                } else if (state === 'RECEPTION_OVER') {
                    return 'Прием окончен'
                }
            },

            getTime(date){
                return new Date(date).toLocaleTimeString()
            },

            onClickRow(row) {
                let routeData = this.$router.resolve({name: 'ScheduleOnDate', params: {d: row.day}});
                window.open(routeData.href, '_self');
            },
        },

        mounted() {
            History.initialization(this, this.clientId)

        },

        computed: {
            client() {
                return this.historyList[0].client
            }
        }
    }
</script>

<style scoped>

</style>
