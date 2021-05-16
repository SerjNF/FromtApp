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

    <v-dialog v-model="orderDialog" max-width="600px"
              hide-overlay
              transition="dialog-bottom-transition">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-toolbar>
                  <v-autocomplete class="v-size--small"
                                  v-model="selectPrice"
                                  :loading="loading"
                                  :items="prices"
                                  :search-input.sync="search"
                                  :item-text="priceText"
                                  return-object
                                  overlay-color="green"
                                  hide-details
                                  hide-no-data
                                  label="Код или название услуги"
                                  prepend-icon="search"
                  ></v-autocomplete>
                </v-toolbar>
              </v-col>
            </v-row>

            <div class="text--primary" :hidden="editPrice.id === ''">
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    readonly
                    v-model="editPrice.value"
                    label="Стоимость"
                    prepend-icon="money"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">

                  <v-text-field
                    v-model="editPrice.counts"
                    label="Количество"
                    suffix="ед."
                    :rules="[number]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="editPrice.sale"
                    label="Скидка"
                    suffix="%"

                    :rules="[number]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
              <h4>Итого:</h4>  {{totalPrice}}
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h4>Ниаменование услуги:</h4>
                  <span>{{editPrice.serviceName}}</span>
                  <br>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="orderDialog=false">Закрыть</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="addPrice">Добавить</v-btn>

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
          {text: 'Категория услуги', value: 'categoryName', align: 'right'},
          {text: 'Наименование услуги', value: 'priceName', align: 'right'},
          {text: 'Стоимость услуги', value: 'price', align: 'right'},
          {text: 'Количество', value: 'count', align: 'right'},
          {text: 'Сумма', value: 'totalPrice', align: 'right'},
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
        editPrice: {
          id: '',
          code: '',
          serviceName: '',
          value: '',
          counts: 1,
          sale: 0
        },
        priceText: function (price) {
          return 'Код: ' + price.code + '. /Наименование: ' + price.serviceName
        },
        number: v => /^[0-9]+$/.exec(v) != null || 'Введите число',
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

      addPrice() {
        currentOrder.addPrice(this)
      }
    },

    mounted() {
      this.scheduleId = this.clientInfo
      currentOrder.getInvoice(this.scheduleId, this)
    },

    computed: {
      totalPrice : function () {
       return (this.editPrice.value - this.editPrice.value * this.editPrice.sale / 100) * this.editPrice.counts
      }
    },

    watch: {
      clientInfo: function () {
        this.scheduleId = this.clientInfo
        currentOrder.getInvoice(this.scheduleId, this)
      },

      search(val) {
        val && this.selectPrice === null && this.querySelections(val)
      },

      selectPrice: function () {
        if (this.selectPrice !== null) {
          this.editPrice.code = this.selectPrice.code;
          this.editPrice.serviceName = this.selectPrice.serviceName;
          this.editPrice.value = this.selectPrice.value;
          this.editPrice.count = this.selectPrice.count;
          this.editPrice.id = this.selectPrice.id;
          this.selectPrice = null
          this.prices = null
        }
      }
    }
  }
</script>

<style scoped>

</style>
