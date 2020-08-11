<template>
  <v-app id="inspire">
    <navigation></navigation>

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
          <component :is="item.component"></component>
        </v-tab-item>
      </v-tabs-items>
    </v-content>

  </v-app>
</template>

<script>
    import store from '@/store/index'
    import checkToken from "@/plugins/checkToken";


    export default {
        components: {
            users: () => import('./Users/Users.vue'),
            settings: () => import('./Setting/Setting.vue'),
            employees: () => import('./Employees/Employees.vue'),
            positions: () => import('./Positions/Positions.vue'),
            price: () => import('./Price/Price.vue')

        },
        beforeRouteEnter(to, from, next) {
            if (store.state.user.User.role === "ADMIN") {
                checkToken.beforeRoute(to, from, next, 1)
            } else {
                next(false)
            }
        },
        data: () => ({
            dialog: false,

            tab: null,
            items: [
                {name: 'Основные', component: 'settings'},
                {name: 'Пользователи', component: 'users'},
                {name: 'Сотрудники', component: 'employees'},
                {name: 'Должности', component: 'positions'},
                {name: 'Прайс', component: 'price'},

            ],
        }),

        mounted() {
            document.title = "Администрирование"
        },
        methods:
            {

            }
    }
</script>
