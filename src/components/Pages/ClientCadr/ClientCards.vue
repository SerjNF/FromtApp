<template>
  <v-app id="inspire">
    <navigation></navigation>

      <client-list v-if="$route.params.id === 0 || $route.params.id === undefined"></client-list>
      <client-data v-if="$route.params.id >= 0" :clientId=$route.params.id></client-data>

  </v-app>
</template>

<script>
    import checkToken from "@/plugins/checkToken";
    import ClientList from "./clientList/ClientList"
    import ClientData from "./clientData/ClientData"

    export default {
        name: 'root',
        components: {ClientList, ClientData},

        beforeRouteEnter(to, from, next) {
            checkToken.beforeRoute(to, from, next, 2)
        },
        data() {
            return {
                dialog: false,
                clientId: this.$route.params.id,


            }
        },

        methods: {
            initialization() {
            }
        },

        mounted() {
            this.initialization()
        },

    }
</script>
