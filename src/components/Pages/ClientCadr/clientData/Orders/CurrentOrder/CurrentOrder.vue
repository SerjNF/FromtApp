<template>
  <v-card
    class="ml-3 mr-3 body-2">
    <v-data-table
      :headers="headers"
      :items="orderData"
      item-key="id"
      sort-by="id"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
      class="elevation-1"

    >
      <template v-slot:top>
        <v-btn color="blue darken-1" text right @click="">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <template v-slot:footer>
        <footerr :itemLength="orderData.length"
                 @changePage="changePageNumber"
                 @changeItemPerPage="changeItemPerPag"></footerr>
      </template>
    </v-data-table>

  </v-card>


</template>

<script>
    import Footer from '@/components/Pages/Admin/Footer/Footer.vue'

    export default {
        name: "CurrentOrder",
        components: {
            footerr: Footer
        },
        data: () => {
            return {
                page: 1,
                itemsPerPage: 10,
                headers: [
                    {
                        text: '№',
                        align: 'start',
                        value: 'id',

                    },
                    { text: 'Категория услуги', value: 'pricesCategory', align: 'right' },
                    { text: 'Наименование услуги', value: 'pricesName', align: 'right' },
                    { text: 'Стоимость услуги', value: 'pricesValue', align: 'right' },
                    { text: 'Количество', value: 'count', align: 'right' },
                    { text: 'Сумма', value: 'totalValue', align: 'right' },
                    { text: 'Дата', value: 'orderDate', align: 'right' },
                    { text: 'Статус', value: 'orderState', align: 'right' },
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
                }]
            }
        },

        methods: {
            changePageNumber(p) {
                this.page = p
            },

            changeItemPerPag(i) {
                this.itemsPerPage = i
            },
        }
    }
</script>

<style scoped>

</style>
