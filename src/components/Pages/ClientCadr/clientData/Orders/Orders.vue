<template>

    <v-card
 >
      <v-card-title
        class="d-flex flex-row-reverse">
        <span class="">Баланс: {{clId}}</span>
      </v-card-title>

      <v-tabs
        vertical
        v-model="tab"
      >
        <v-tab
          v-for="item in items"
          :key="item.name"
        class="font-weight-bold">
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
    components: {CurrentOrder},


    data() {
      return {
        tab: null,
        items: [
          {name: 'Текущий', component: 'CurrentOrder'},

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
