<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card
    class="body-2">
    <v-card-title
      class="d-flex">
      <span class="">Список счетов</span>
    </v-card-title>

    <v-timeline dense>
      <v-timeline-item
        class="white--text mr-12"
        color="black"
        small
      >
        <v-select
          class="mr-auto"
          v-model="scheduleSelect"
          :items="scheduleClient"
          :item-text="selectText"

          prepend-icon="assignment_ind"

          return-object>

        </v-select>


        <!--<template v-slot:append>-->
        <v-btn
          :disabled="scheduleSelect.length === 0"
          class="mx-0"
          depressed
          @click="addInvoice"
        >
          Добавить счет
        </v-btn>

        <!--</template>-->

      </v-timeline-item>
      <v-slide-x-transition
        group
      >
        <v-timeline-item
          v-for="(item, i) in invoicesList"
          :key="i"
          :color="item.color"
          :icon="item.icon"
          small
        >
          <v-row
          @click="invoiceDialod(invoicesList[i].scheduleId)">
            <v-col>
              <h3>Счет номер:
                {{item.invoiceNumber}}
              </h3>
            </v-col>
            <v-col>
              <h3>Дата приема:
                {{new Date(item.date).toLocaleDateString()}}
              </h3>
            </v-col>
            <v-col>
              <h3>Сотрудник:
                {{item.employee}}
              </h3>
            </v-col>
            <v-col>
              <h3>Составил счет:
                {{item.actor}}
              </h3>
            </v-col>
            <v-col>
              <v-chip
                :color="statusChip(item.invoiceState).color"
              ><h3>{{statusChip(item.invoiceState).state}}</h3></v-chip>


            </v-col>
          </v-row>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>

    <v-dialog v-model="orderDialog" max-width="1500px"
              hide-overlay
              transition="dialog-bottom-transition"
    >
      <current-order :clientInfo="scheduleId"></current-order>

    </v-dialog>

    <v-snackbar
      bottom="bottom"
      text
      v-model="badData"
      :color=snacColor>
      {{ snacMessage }}
      <v-btn
        color="black"
        text
        @click="badData = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
  </v-card>


</template>

<script>
  import Footer from '@/components/Pages/Admin/Footer/Footer.vue'
  import Invoices from './index.js'
  import CurrentOrder from "@/components/Modules/currentOrder/currentOrder";

  export default {
    name: "Invoices",
    props: ["cltId"],
    components: {
      footerr: Footer,
      currentOrder: CurrentOrder
    },
    data: () => {
      return {
        snacColor: "grey",
        snacMessage: "",
        badData: false,
        invoicesList: [],
        orderDialog: false,
        selectPrice: '',
        items: [],
        scheduleClient: [],
        scheduleSelect: '',
        page: 1,
        itemsPerPage: 10,
        scheduleId: "",

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
      this.clId = this.cltId;
      Invoices.getScheduleClientByClient(this);
      Invoices.getInvoiceListByClientId(this);
    },


    methods: {
      statusChip(state) {
        if (state === 'NEW_ORDER') {
          return {state: 'Не оплачен', color: 'orange'}
        } else if (state === 'CLOSE_ORDER') {
          return {state: 'Оплачен', color: 'green'}
        } else {
          return {state: 'Ошибка', color: 'black'}
        }
      },

      invoiceDialod(id){
        this.scheduleId = id
        this.orderDialog = true
      },

      addInvoice() {
        Invoices.addInvoices(this)
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
