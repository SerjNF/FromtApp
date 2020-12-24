<template>

    <v-card
 >
      <v-card-title
        class="d-flex flex-row-reverse">
        <span class="">Баланс: {{clId}}</span>
      </v-card-title>


            <invoices :cltId="clId" ></invoices>

    </v-card>


</template>

<script>
  import Invoices from "./Invoices/Invoices"
  import OrderHistory from "./OrderHistory/OrderHistory"


  export default {
    name: "Orders",
    props: ['clientId'],
    components: {Invoices},


    data() {
      return {
        tab: null,
        data: '',
        clId: ''
      }
    },


    beforeMount() {
      this.clId = this.clientId;

    },
  }
</script>

<style scoped>

</style>
