<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card>
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
          <v-btn color="blue darken-1" text right>
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
        schId: ''
      }
    },



    created (){
    },


    mounted() {
      currentOrder.getOrders(this.clientInfo.event._def.publicId, this)
    },


    watch: {
      clientInfo: function () {
        currentOrder.getOrders(this.clientInfo.event._def.publicId, this)
      },
    }
  }
</script>

<style scoped>

</style>
