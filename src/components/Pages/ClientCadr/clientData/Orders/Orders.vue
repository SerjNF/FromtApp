<template>

    <v-card
      class="ml-3 mr-3">
      <v-tabs
        vertical
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          v-for="item in items"
          :key="item.name">
          {{ item.name }}
        </v-tab>



        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item.name">
            <component :clientId="clId" :is="item.component"></component>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>


</template>

<script>
  import CurrentOrder from "./CurrentOrder/CurrentOrder"
  import OrderHistory from "./OrderHistory/OrderHistory"


  export default {
    name: "Orders",
    props: ['clientId'],
    components: {CurrentOrder, OrderHistory},


    data() {
      return {
        tab: null,
        items: [
          {name: 'Текущий', component: 'CurrentOrder'},
          {name: 'История', component: 'OrderHistory'},
        ],
        clId: ''
      }
    },

    mounted() {
      this.clId = this.clientId;

    },
  }
</script>

<style scoped>

</style>
