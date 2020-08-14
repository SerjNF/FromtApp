<template>
  <v-app id="inspire">
    <navigation></navigation>

      <client-list v-if="$route.params.id === 0 || $route.params.id === undefined"></client-list>
      <client-data v-if="$route.params.id >= 0" :clientId=$route.params.id></client-data>

  </v-app>
</template>

<script>
    import checkToken from "@/plugins/checkToken";
    import store from '@/store/index'
    import ClientList from "./clientList/ClientList"
    import ClientData from "./clientData/ClientData"

    export default {
        name: 'root',
        components: {ClientList, ClientData},

        beforeRouteEnter(to, from, next) {

            if (store.state.user.User.role === "PERSONAL") {
                next(false)
            } else {
                checkToken.beforeRoute(to, from, next, 2)

            }
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
