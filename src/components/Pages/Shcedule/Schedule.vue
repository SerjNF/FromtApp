<template>
  <v-app id="inspire">
    <navigation></navigation>

    <v-content
      class="ml-3 mr-3">
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          v-for="item in items"
          :key="item.name"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>


      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item.name">
          <component :clientDate="clientDate" :is="item.component"></component>
        </v-tab-item>
      </v-tabs-items>

    </v-content>
    <!--<v-btn-->
      <!--bottom-->
      <!--color="pink"-->
      <!--dark-->
      <!--fab-->
      <!--fixed-->
      <!--right-->
      <!--@click="dialog = !dialog"-->
    <!--&gt;-->
      <!--<v-icon>zoom_in</v-icon>-->
    <!--</v-btn>-->
    <!--<v-dialog-->
      <!--v-model="dialog"-->
      <!--hide-overlay-->
      <!--width="800px"-->
    <!--&gt;-->
      <!--<v-card>-->
        <!--<v-card-title class="grey darken-2">-->
          <!--Create contact-->
        <!--</v-card-title>-->
        <!--<v-container>-->
          <!--<v-row>-->
            <!--<v-col-->
              <!--class="align-center justify-space-between"-->
              <!--cols="12"-->
            <!--&gt;-->
              <!--<v-row align="center">-->
                <!--<v-avatar-->
                  <!--size="40px"-->
                  <!--class="mr-4"-->
                <!--&gt;-->
                  <!--<img-->
                    <!--src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"-->
                    <!--alt=""-->
                  <!--&gt;-->
                <!--</v-avatar>-->
                <!--<v-text-field-->
                  <!--placeholder="Name"-->
                <!--&gt;</v-text-field>-->
              <!--</v-row>-->
            <!--</v-col>-->
            <!--<v-col cols="6">-->
              <!--<v-text-field-->
                <!--prepend-icon="business"-->
                <!--placeholder="Company"-->
              <!--&gt;</v-text-field>-->
            <!--</v-col>-->
            <!--<v-col cols="6">-->
              <!--<v-text-field-->
                <!--placeholder="Job title"-->
              <!--&gt;</v-text-field>-->
            <!--</v-col>-->
            <!--<v-col cols="12">-->
              <!--<v-text-field-->
                <!--prepend-icon="mail"-->
                <!--placeholder="Email"-->
              <!--&gt;</v-text-field>-->
            <!--</v-col>-->
            <!--<v-col cols="12">-->
              <!--<v-text-field-->
                <!--type="tel"-->
                <!--prepend-icon="phone"-->
                <!--placeholder="(000) 000 - 0000"-->
              <!--&gt;</v-text-field>-->
            <!--</v-col>-->
            <!--<v-col cols="12">-->
              <!--<v-text-field-->
                <!--prepend-icon="notes"-->
                <!--placeholder="Notes"-->
              <!--&gt;</v-text-field>-->
            <!--</v-col>-->
          <!--</v-row>-->
        <!--</v-container>-->
        <!--<v-card-actions>-->
          <!--<v-btn-->
            <!--text-->
            <!--color="primary"-->
          <!--&gt;More-->
          <!--</v-btn>-->
          <!--<div class="flex-grow-1"></div>-->
          <!--<v-btn-->
            <!--text-->
            <!--color="primary"-->
            <!--@click="dialog = false"-->
          <!--&gt;Cancel-->
          <!--</v-btn>-->
          <!--<v-btn-->
            <!--text-->
            <!--@click="dialog = false"-->
          <!--&gt;Save-->
          <!--</v-btn>-->
        <!--</v-card-actions>-->
      <!--</v-card>-->
    <!--</v-dialog>-->
  </v-app>
</template>

<script>
    import checkToken from "@/plugins/checkToken";

    export default {
        components: {
            ClientCalendar: () => import('./fullcalendar_client/ClientCalendar.vue'),
            EmployeeCalendar: () => import('./fullcalendar_employee/EmployeeCalendar.vue'),
        },

        props: {
            source: String,
        },
        beforeRouteEnter(to, from, next) {
            checkToken.beforeRoute(to, from, next, 0)
        },
        data() {
            return {
                clientDate: this.$route.params.d,
                dialog: false,

                tab: null,
                items: [
                    {name: 'Расписание', component: 'ClientCalendar'},
                    {name: 'График работы', component: 'EmployeeCalendar'}
                ],
                // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        },

        mounted() {

            document.title = "Рассписание"
        },

    }
</script>
