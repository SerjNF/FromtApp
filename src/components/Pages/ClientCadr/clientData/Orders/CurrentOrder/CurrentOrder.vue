<template>
  <v-card
    class="ml-3 mr-3 body-2">
    <v-card-title
      class="d-flex flex-row-reverse">
      <span class="">Баланс: {{clId}}</span>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="orderData"
      item-key="id"
      sort-by="id"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
      class="elevation-0"
    >
      <template v-slot:top>
        <v-btn color="blue darken-1" text right @click="dialog()">
          <v-icon>search</v-icon>
        </v-btn>
      </template>
      <template v-slot:footer>
        <footerr :itemLength="orderData.length"
                 :startItemPerPage = "itemsPerPage"
                 @changePage="changePageNumber"
                 @changeItemPerPage="changeItemPerPag"></footerr>
      </template>
    </v-data-table>

    <v-dialog v-model="searchPrice" max-width="500px"
              hide-overlay
              transition="dialog-bottom-transition"
              >
      <v-card>
        <v-card-title>
          <span>Добавить услугу</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="scheduleSelect"
            :items="scheduleClient"
            :item-text="selectText"
            label="Выбрать приём"
            prepend-icon="assignment_ind"
            return-object>
          </v-select>
        <v-autocomplete
          v-model="selectPrice"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          :item-text="priceName"
          return-object
          hide-no-data
          hide-details
          label="Код или наименование"
          prepend-icon="search"
        ></v-autocomplete>
        </v-card-text>
      </v-card>

    </v-dialog>
  </v-card>

</template>

<script>
    import Footer from '@/components/Pages/Admin/Footer/Footer.vue'
    import CurrentOrder from './index.js'

    export default {
        name: "CurrentOrder",
        props: ["clientId" ],
        components: {
            footerr: Footer
        },
        data: () => {
            return {
                searchPrice: false,
                selectPrice: '',
                items: [],
                scheduleClient: [],
                scheduleSelect: '',
                page: 1,
                itemsPerPage: 10,
                headers: [
                    {text: '№', align: 'start', value: 'id',},
                    {text: 'Категория услуги', value: 'pricesCategory', align: 'right'},
                    {text: 'Наименование услуги', value: 'pricesName', align: 'right'},
                    {text: 'Стоимость услуги', value: 'pricesValue', align: 'right'},
                    {text: 'Количество', value: 'count', align: 'right'},
                    {text: 'Сумма', value: 'totalValue', align: 'right'},
                    {text: 'Дата', value: 'orderDate', align: 'right'},
                    {text: 'Статус', value: 'orderState', align: 'right'},
                ],
                orderData: [{
                    id: 1,
                    pricesCategory: "категория",
                    pricesName: "услуга",
                    pricesValue: "150",
                    count: "2",
                    totalValue: "300",
                    orderDate: "date",
                    orderState: "state"
                }],
                clId: "",
                loading: false,
                search: null,
                priceName: function (val) {
                    return val.serviceName + ' '
                },

                selectText: function (val) {
                    return "Время приема: " + val.start + ' Врач: ' + val.employee
                }
            }
        },

        mounted() {
            this.clId = this.clientId;

        },
        methods: {
            dialog(){
                this.searchPrice = true;
                CurrentOrder.getScheduleClientByClient(this);
                },

            querySelections(val) {
                this.loading = true
              //  Schedule.getClientListFiltered
                setTimeout(() => {
                    CurrentOrder.getPriceListFiltered (val, this)
                }, 500)

                setTimeout(() => {
                    this.items = this.priceList.filter(e => {
                        return (e.serviceName || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1 ||
                            (e.code || '').indexOf((val || '').toLowerCase()) > -1 ||
                            (e.id || '').indexOf((val || '').toLowerCase()) > -1
                    })
                    this.loading = false
                }, 500)
            },

            changePageNumber(p) {
                this.page = p
            },
            changeItemPerPag(i) {
                this.itemsPerPage = i
            },
        },

        watch: {
            search(val) {
                val && val !== this.select && this.querySelections(val)
            },
        }
    }
</script>

<style scoped>

</style>
