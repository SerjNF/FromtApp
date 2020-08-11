<template>

  <v-row class="mt-2 ml-2 mr-4 pb-2" align="center" justify="center">
    <span class="grey--text">Записей на странице</span>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          text
          color="primary"
          class="ml-2"
          v-on="on"
        >
          {{ itemsPerPage }}
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(number, index) in itemsPerPageArray"
          :key="index"
          @click="updateItemsPerPage(number)"
        >
          <v-list-item-title>{{ number }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div class="flex-grow-1"></div>

    <span
      class="mr-4
            grey--text">
            Page {{ page }} of {{ numberOfPages }}
    </span>
    <v-btn
      fab
      dark
      color="blue darken-3"
      class="mr-1"
      @click="formerPage"
    >
      <v-icon>keyboard_arrow_left</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      color="blue darken-3"
      class="ml-1"
      @click="nextPage"
    >
      <v-icon>keyboard_arrow_right</v-icon>
    </v-btn>
  </v-row>

</template>

<script>
    export default {
        props: ['itemLength'],
        data: () => ({
            page: 1,
            itemsPerPageArray: [20, 40, 100],
            itemsPerPage: 20,
        }),

        computed: {
            numberOfPages() {
                return Math.ceil(this.itemLength / this.itemsPerPage)
            },
        },
        methods: {
            nextPage() {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
                this.$emit('changePage', this.page);
            },
            formerPage() {
                if (this.page - 1 >= 1) this.page -= 1
                this.$emit('changePage', this.page);
            },
            updateItemsPerPage(number) {
                this.itemsPerPage = number
                this.$emit('changeItemPerPage', this.itemsPerPage);
                this.page = 1
            }
        }
    }
</script>

<style scoped>

</style>
