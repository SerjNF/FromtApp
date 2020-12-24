<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card
    class="body-2">
    <v-card-title
      class="d-flex">
      <span class="">Список счетов</span>
    </v-card-title>

    <v-timeline
      dense

    >
      <v-timeline-item

        class="white--text mb-12"
        color="orange"
        small
      >
        <!--<template v-slot:icon>-->
          <!--<span>JL</span>-->
        <!--</template>-->

          <v-select
            v-model="scheduleSelect"
            :items="scheduleClient"
            :item-text="selectText"

            prepend-icon="assignment_ind"
            persistent-hint
            return-object>
            <template v-slot:append>
              <v-btn
                class="mx-0"
                depressed
                @click="addInvoice"
              >
                Добавить счет
              </v-btn>
            </template>

          </v-select>


      </v-timeline-item>
      <v-slide-x-transition
        group
      >
      <v-timeline-item
        v-for="(item, i) in invoicesList"
        :key="i"
        :color="item.color"
        :icon="item.icon"
        fill-dot
      >
        <v-row>
          <v-col>
            {{item.employee}}
          </v-col>
          <v-col>
            {{item.invoiceState}}
          </v-col>
          <v-col>
            {{new Date(item.invoiceDate).toLocaleDateString()}}
          </v-col>
        </v-row>
      </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>

      <!--<v-expansion-panels>-->
      <!--<v-expansion-panel-->
        <!--v-for="i in orderData"-->
        <!--:key="i">-->
        <!--<v-expansion-panel-header>Адреса {{i.id}}-->
        <!--</v-expansion-panel-header>-->
        <!--<v-expansion-panel-content>-->
          <!--<v-data-table-->
            <!--:headers="headers"-->
            <!--:items="i.orders"-->

            <!--item-key="id"-->
            <!--sort-by="id"-->
            <!--:items-per-page.sync="itemsPerPage"-->
            <!--:page="page"-->
            <!--hide-default-footer-->
            <!--class="elevation-0"-->
          <!--&gt;-->
            <!--<template v-slot:top>-->
              <!--<v-btn color="blue darken-1" text right @click="dialog()">-->
                <!--<v-icon>add</v-icon>-->
              <!--</v-btn>-->
            <!--</template>-->
            <!--<template v-slot:group-by>-->

            <!--</template>-->
            <!--<template v-slot:footer>-->
              <!--<footerr :itemLength="orderData.length"-->
                       <!--:startItemPerPage="itemsPerPage"-->
                       <!--@changePage="changePageNumber"-->
                       <!--@changeItemPerPage="changeItemPerPag"></footerr>-->
            <!--</template>-->
          <!--</v-data-table>-->

        <!--</v-expansion-panel-content>-->
      <!--</v-expansion-panel>-->
    <!--</v-expansion-panels>-->

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
  import Invoices from './index.js'

  export default {
    name: "Invoices",
    props: ["cltId"],
    components: {
      footerr: Footer
    },
    data: () => {
      return {
        invoicesList: [],
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
          orders: [{
            id: 1,
            pricesCategory: "категория",
            pricesName: "услуга",
            pricesValue: "150",
            count: "2",
            totalValue: "300",
            orderDate: "date",
            orderState: "state"
          }]
        },
          {
            id: 2,
            orders: [{
              id: 2,
              pricesCategory: "категория2",
              pricesName: "услуга2",
              pricesValue: "2",
              count: "1",
              totalValue: "200",
              orderDate: "date1",
              orderState: "state3"
            }]
          }

        ],


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

    mounted(){
      console.log("invoice get ID = " + this.cltId);
      this.clId = this.cltId;
      Invoices.getScheduleClientByClient(this);
      Invoices.getInvoiceListByClientId(this);
    },


    methods: {

      addInvoice() {
        Invoices.addInvoices(this)
      },

      dialog() {
        this.searchPrice = true;
        Invoices.getScheduleClientByClient(this);
      },

      querySelections(val) {
        this.loading = true
        //  Schedule.getClientListFiltered
        setTimeout(() => {
          CurrentOrder.getPriceListFiltered(val, this)
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
