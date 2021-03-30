<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-card v-if="isInvoice">
      <v-card-title>
        Счет номер: {{invoice.invoiceNumber}}
      </v-card-title>
      <v-card-text>
        <v-banner>
          Общая стоимость: {{invoice.totalPrice}}
        </v-banner>
        <v-banner>
          Статус: {{invoice.invoiceState}}
        </v-banner>
        <v-banner>
          Оплата
        </v-banner>
        <v-divider>

        </v-divider>

        <!--:items-per-page.sync="itemsPerPage"-->
        <!--:page="page"-->

        <v-data-table
          :headers="headers"
          :items="invoice.orderDtoList"

          item-key="id"
          sort-by="id"


          hide-default-footer
          class="elevation-0"
        >
          <template v-slot:top>
            <!--<v-btn color="blue darken-1" text right @click="dialog()">-->
            <v-btn color="blue darken-1" text right @click="orderDialog=true">
              <v-icon>add</v-icon>
            </v-btn>
          </template>

          <!--<template v-slot:footer>-->
          <!--<footerr :itemLength="orderData.length"-->
          <!--:startItemPerPage="itemsPerPage"-->
          <!--@changePage="changePageNumber"-->
          <!--@changeItemPerPage="changeItemPerPag"></footerr>-->
          <!--</template>-->
        </v-data-table>

      </v-card-text>
    </v-card>


    <v-card v-if="!isInvoice">
      <v-card-text>
        <v-btn color="blue darken-1" class="primary" @click="addInvoice">
          Новый счёт
        </v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="orderDialog" max-width="1000px"
              hide-overlay
              transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <span class="headline">Новая Запись</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-toolbar

                >
                  <v-toolbar-title>Поиск:</v-toolbar-title>
                  <v-autocomplete
                    v-model="selectPrice"
                    :loading="loading"
                    :items="prices"
                    :search-input.sync="search"
                    :item-text="priceText"
                    return-object

                    hide-details
                    label="Код или название услуги"

                    prepend-icon="search"
                  ></v-autocomplete>

                  <!--<v-autocomplete-->
                    <!--v-model="selectClient"-->
                    <!--:loading="loading"-->
                    <!--:items="items"-->
                    <!--:search-input.sync="search"-->
                    <!--:item-text="fullName"-->
                    <!--return-object-->

                    <!--hide-no-data-->
                    <!--hide-details-->
                    <!--label="Введите фамилию клиента..."-->

                    <!--prepend-icon="search"-->
                  <!--&gt;</v-autocomplete>-->
                </v-toolbar>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <!--<v-text-field-->
                <!--:disabled="this.editedItem.clientId > 0"-->
                <!--prepend-icon="how_to_reg"-->
                <!--v-model="editedItem.lastName" label="Фамилия"></v-text-field>-->
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" right @click="orderDialog=false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  import currentOrder from './index'

  export default {
    name: "currentOrder",
    props: ['clientInfo'],
    data: () => {
      return {
        headers: [
          {text: '№', align: 'start', value: 'id',},
          {text: 'Артикль', value: 'article',},
          {text: 'Категория услуги', value: 'pricesCategory', align: 'right'},
          {text: 'Наименование услуги', value: 'pricesName', align: 'right'},
          {text: 'Стоимость услуги', value: 'pricesValue', align: 'right'},
          {text: 'Количество', value: 'count', align: 'right'},
          {text: 'Сумма', value: 'totalValue', align: 'right'},
          // {text: 'Дата', value: 'orderDate', align: 'right'},
          // {text: 'Статус', value: 'orderState', align: 'right'},
        ],
        invoice: {},
        isInvoice: false,
        scheduleId: '',
        orderDialog: false,
        loading: false,
        selectPrice: null,
        search: null,
        searchData: '',
        prices: [],
        loadingData: [],
        priceText: function (price) {
          return 'Код: ' + price.code + '. /Наименование: ' + price.serviceName
        }
      }
    },


    methods: {
      addInvoice() {
        currentOrder.addInvoice(this)
      },

      querySelections(val) {
        this.loading = true
        this.searchData = val

        setTimeout(() => {
          currentOrder.getPriceListByValue(val, this)
        }, 500)

        setTimeout(() => {
          this.prices = this.loadingData.filter(e => {
            return (e.code || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1 ||
            (e.serviceName || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 1000)
      },
    },

    mounted() {
      this.scheduleId = this.clientInfo.event._def.publicId
      currentOrder.getInvoice(this.scheduleId, this)
    },

    watch: {
      clientInfo: function () {
        this.scheduleId = this.clientInfo.event._def.publicId
        currentOrder.getInvoice(this.scheduleId, this)
      },

      search(val) {
        val  && this.querySelections(val)
      },
    }
  }
</script>

<style scoped>

</style>
