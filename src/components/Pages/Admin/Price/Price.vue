<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            @click:row="rowClick"
            :headers="categoryHead"
            :items="categoryItems"
            hide-default-footer

          >
            <template
              v-slot:item.nameCategory="props">
              <v-edit-dialog
                :return-value.sync="props.item.nameCategory"
                @save="saveCategory(props.item)"
                v-model="selectRow"
                :large="true"
                save-text="Сохранить"
                cancel-text="Закрыть"
              > {{ props.item.nameCategory }}
                <template v-slot:input>
                  <v-text-field
                    v-model="props.item.nameCategory"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>

<!--            <template v-slot:top>-->
<!--              <v-toolbar flat color="white">-->
<!--                <v-toolbar-title>Список категорий</v-toolbar-title>-->
<!--              </v-toolbar>-->
<!--            </template>-->

            <template v-slot:footer>
              <v-card class="d-flex flex-row-reverse">

                <v-btn color="blue darken-1" text right @click="addCategory">
                  <v-icon>add</v-icon>
                </v-btn>
                <v-btn color="blue darken-1" text right @click="removeCategory">
                  <v-icon>remove</v-icon>
                </v-btn>
              </v-card>
            </template>


                        <template
                          v-slot:item.action="{ item }">
                          <v-icon v-if="selectRow === item"

                            class="d-flex flex-row-reverse"
                            small
                          >
                          keyboard_tab
                          </v-icon>

                        </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="10">

        <v-data-table
          :headers="serviceHead"
          :items="serviceItems"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:footer>
            <v-card class="d-flex flex-row-reverse">


              <v-btn color="blue darken-1" text right>
                <v-icon>add</v-icon>
              </v-btn>
            </v-card>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
<!--    <v-snackbar-->
<!--      bottom="bottom"-->
<!--      text-->
<!--      v-model="badData"-->
<!--      :color=snacColor>-->
<!--      {{ snacMessage }}-->
<!--      <v-btn-->
<!--        color="black"-->
<!--        text-->
<!--        @click="badData = false"-->
<!--      >-->
<!--        Закрыть-->
<!--      </v-btn>-->
<!--    </v-snackbar>-->

  </v-container>
</template>

<script>
    import Price from './index'

    export default {
        name: "Price",
        data: () => ({
            max25chars: v => v.length <= 25 || 'Input too long!',

            categoryHead: [
                {text: '№', value: 'id'},
                {text: 'Категория', value: 'nameCategory'},
                {text: '', value: 'action'},
            ],
            categoryItems: [],

            serviceHead: [
                {text: 'Код', value: 'code'},
                {text: 'Наименование услуги', value: 'serviceName'},
                {text: 'Цена', value: 'value'}],
            serviceItems: [],
            selectRow: '',

        }),

        mounted() {
            this.initialization()
        },

        methods: {
            initialization() {
                Price.initialization(this)
            },

            addCategory() {
                this.categoryItems.push({id: '', nameCategory: 'th'})
            },

            saveCategory(row){
                Price.saveCategory(row, this)
            },

            removeCategory(){
              Price.removeCategory(this.selectRow, this)
            },

            rowClick(row) {
                this.selectRow = row;

                console.log(row)
            },
            deleteItem(item) {
                console.log(item)
            },
        },

        watch: {
            selectRow: () => {
                console.log(this.selectRow)
            }
        }

    }
</script>

<style scoped>

</style>
