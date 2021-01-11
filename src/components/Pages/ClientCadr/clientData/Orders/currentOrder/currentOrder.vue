<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card>
      <v-card-title>
        Счет номер
      </v-card-title>
      <v-card-subtitle>
        <v-btn>добавить</v-btn>
      </v-card-subtitle>
      <v-card-text>
        <v-span>
          Сотрудник
        </v-span>
        <v-span>
          Статус
        </v-span>
        <v-span>
          Оплата
        </v-span>
        <v-divider>

        </v-divider>
        <v-data-table
        :headers="headers"
        :items="orders"

        item-key="id"
        sort-by="id"
        :items-per-page.sync="itemsPerPage"
        :page="page"
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
    export default {
        name: "currentOrder",
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
            orders: [],
          }
      },
    }
</script>

<style scoped>

</style>
