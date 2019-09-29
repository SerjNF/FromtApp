<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{this.$store.getters.getFullName}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{this.$store.getters.getRole}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-btn icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
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
        <span class="hidden-sm-and-down">Google Contacts</span>
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
  import store from '@/store/index'
    export default {
        name: 'navigation',
        data: () => ({
            model: store.state.link.page,
            dialog: false,
            drawer: null,
            items: [
                {title: 'Расписание', icon: 'today', href: '/#/'},
                {title: 'Администрирование', icon: 'assignment_ind', href: '/#/admin'},
                {title: 'Что еще', icon: 'android'},
            ],
            right: null,
        }),
        methods: {
            change(i) {
                console.log(i)
                this.item = i
            }
        },
    }
</script>

<style scoped>

</style>
