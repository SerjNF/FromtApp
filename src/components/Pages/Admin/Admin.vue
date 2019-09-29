<template>
  <v-app id="inspire">
    <navigation></navigation>

    <v-content>
<!--      <v-container-->
<!--        class="fill-height"-->
<!--        fluid-->
<!--      >-->

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item"
          >

<!--            <v-card flat color="basil">-->
<!--              <v-card-text>{{ tab }}</v-card-text>-->
<!--            </v-card>-->
          </v-tab-item>
        </v-tabs-items>

<!--      </v-container>-->
    </v-content>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>zoom_in</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create contact
        </v-card-title>
        <v-container>
          <v-row>
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row align="center">
                <v-avatar
                  size="40px"
                  class="mr-4"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            text
            color="primary"
          >More
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel
          </v-btn>
          <v-btn
            text
            @click="dialog = false"
          >Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
    import store from '@/store/index'
    import checkToken from "@/plugins/checkToken";
    export default {
        props: {
            source: String,
        },
        beforeRouteEnter(to, from, next) {
            let role = store.getters.getRole
            console.log(role)
            if ( role === "ADMIN") {
                // store.dispatch('pageLink/SET_PAGE', 0)
                checkToken.beforeRoute(to, from, next, 1)
            } else {
                next(false)
            }
        },
        data: () => ({
            dialog: false,

            tab: null,
            items: [
                'Основные', 'Список сотрудников', 'Должности'
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }),
    }
</script>
