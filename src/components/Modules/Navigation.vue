<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{this.$store.state.user.User.fullName}}
          </v-list-item-title>
          <v-list-item-subtitle>

          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
  <!--    <v-btn icon>
        <v-icon @click='exit'>exit_to_app</v-icon>
      </v-btn> -->
      <v-divider>
      </v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item-group v-model="model" mandatory color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            link
            :href="item.href"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
              >{{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
         <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click='exit'>Выход</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 20%"
        class="ml-0"
      >
        <v-btn icon
               @click.stop="drawer = !drawer">
          <v-icon>sort</v-icon>
        </v-btn>
        <!--        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
        <span class="hidden-sm-and-down">Какой нить титул , может название страницы</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="46px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
          </v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
    import store from "@/store/index";
    import router from '@/router'
    import {axInst} from '@/plugins/axInst'


    export default {
        name: 'navigation',
        data: () => ({
            model: store.state.link.page,
            dialog: false,
            drawer: null,
            items: [
                {title: 'Расписание', icon: 'today', href: '/#/'},
                {title: 'Администрирование', icon: 'assignment_ind', href: '/#/admin'},
                {title: 'Список клиентов', icon: 'supervisor_account', href: '/#/card'},
            ],
            right: null,
        }),
        methods: {
          exit() {

              // let token = this.cookie.get('token')
               let token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
               let url = "/exitUser?token=" + token
               axInst.get(url).then()
               localStorage.clear()
               router.push('/login')
          }
        },
    }
</script>

<style scoped>

</style>
