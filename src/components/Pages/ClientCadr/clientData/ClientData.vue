<template>
  <v-content
    class="ml-3 mr-3">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow>
      <v-tab
        v-for="item in items"
        :key="item.name">
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.name">
        <component :clientId="clId"  :is="item.component"></component>
      </v-tab-item>
    </v-tabs-items>
  </v-content>
</template>

<script>

    import General from "./Genteral/General";

    export default {
        name: "ClientData",
        props: ['clientId'],
        components: {
            General
        },

        data() {
            return {
                tab: null,
                items: [
                    {name: 'Основные данные', component: 'General'},
                ],
                clId : ''
            }
        },

        mounted() {
            this.clId = this.clientId;
        },
    }
</script>

<style scoped>

</style>
