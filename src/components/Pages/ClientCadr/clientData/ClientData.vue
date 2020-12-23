<template>
  <v-content
    class="ml-3 mr-3">
    <v-tabs
      v-model="tab"


      grow>
      <v-tab
        v-for="item in items"
        :key="item.name"
        class="font-weight-bold">
        {{ item.name }}
      </v-tab>


    <v-tabs-items v-model="tab" class="elevation-10">
      <v-tab-item
        v-for="item in items"
        :key="item.name">
        <component :clientId="clId" :is="item.component"></component>
      </v-tab-item>
    </v-tabs-items>
    </v-tabs>
  </v-content>

</template>

<script>

  import General from "./Genteral/General";
  import History from "./History/HistoryList"
  import Orders from "./Orders/Orders"

  export default {
    name: "ClientData",
    props: ['clientId'],
    components: {
      General,
      History,
      Orders
    },

    data() {
      return {
        tab: null,
        items: [
          {name: 'Основные данные', component: 'General'},
          {name: 'Счета', component: 'Orders'},
          {name: 'История посещений', component: 'History'},
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
