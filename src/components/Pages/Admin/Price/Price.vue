<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            @click:row="rowCategoryClick"
            :headers="categoryHead"
            :items="categoryItems"
            hide-default-footer
            :calculate-widths="true"
          >
            <template v-if="editCategory"
                      v-slot:item.nameCategory="props">
              <v-edit-dialog
                :return-value.sync="props.item.nameCategory"
                @save="saveCategory(props.item)"
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

            <template v-slot:footer>
              <v-card class="d-flex flex-row-reverse">
                <template v-if="editCategory">
                  <v-btn color="blue darken-1" text right @click="addCategory">
                    <v-icon>add</v-icon>
                  </v-btn>
                  <v-btn color="blue darken-1" text right @click="removeCategory">
                    <v-icon>remove</v-icon>
                  </v-btn>
                </template>
                <v-btn color="dark" @click="lockCategory">{{lockedCategory}}</v-btn>
              </v-card>
            </template>


            <template
              v-slot:item.action="{ item }">
              <v-icon
                medium
                v-if="selectRowCategory === item"
                color="blue darken-1"
                class="d-flex flex-row-reverse">
                lens
              </v-icon>

            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="9">

        <v-data-table
          @click:row="rowPriceClick"
          :headers="priceHead"
          :items="priceItems"
          hide-default-footer
          class="elevation-1">
          :calculate-widths="true"
          <template v-slot:footer>
            <v-card class="d-flex flex-row-reverse">

              <v-btn color="blue darken-1" text right @click="priceDialog = true">
                <v-icon>add</v-icon>
              </v-btn>
              <template v-if=editPrice>
              <v-btn color="blue darken-1" text right @click="removePrice">
                <v-icon>remove</v-icon>
              </v-btn>
              </template>
            </v-card>
          </template>

          <template v-slot:no-data>
            <span>Нет данных</span>
          </template>

          <template
            v-slot:item.code="props">
            <v-edit-dialog
              :return-value.sync="props.item.code"
              @save="saveCode(props.item)"
              :large="true"
              save-text="Сохранить"
              cancel-text="Закрыть"
            > {{ props.item.code }}
              <template v-slot:input>
                <v-text-field
                  number
                  v-model="props.item.code"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>

          <template
            v-slot:item.serviceName="props">
            <v-edit-dialog
              :return-value.sync="props.item.serviceName"
              @save="saveName(props.item)"
              :large="true"
              save-text="Сохранить"
              cancel-text="Закрыть"
            > {{ props.item.serviceName }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.serviceName"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>

          <template
            v-slot:item.value="props">
            <v-edit-dialog
              :return-value.sync="props.item.value"
              @save="savePrice(props.item)"
              :large="true"
              save-text="Сохранить"
              cancel-text="Закрыть"
            > {{ props.item.value }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.value"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template
            v-slot:item.action="{ item }">
            <v-icon
              medium
              v-if="selectRowPrice === item"
              color="blue darken-1"
              class="d-flex flex-row-reverse">
              lens
            </v-icon>
          </template>


        </v-data-table>

        <v-dialog v-model="priceDialog" max-width="800px" @keyup.enter="saveNewPrice">
          <v-card>
            <v-card-title>
              <span class="headline">Новая запись</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="3" md="12">
                    <v-text-field
                      :error="codeError"
                      prepend-icon="how_to_reg"
                      v-model="priceEdit.code" label="Код"
                      @keyup.enter="saveNewPrice"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3" md="12">
                    <v-text-field
                     :error="priceEdit.serviceName.length < 3"
                      prepend-icon="how_to_reg"
                      v-model="priceEdit.serviceName" label="Наименование"
                      @keyup.enter="saveNewPrice"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3" md="12">
                    <v-text-field
                      :error="valueError"
                      prepend-icon="how_to_reg"
                      v-model="priceEdit.value" label="Цена"
                      @keyup.enter="saveNewPrice"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
              <v-btn color="blue darken-1" text @click="saveNewPrice" :disabled="codeError || valueError" >Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
        <v-snackbar
          bottom="bottom"
          text
          v-model="badData"
          :color=snacColor>
          {{ snacMessage }}
          <v-btn
            color="black"
            text
            @click="badData = false"
          >
            Закрыть
          </v-btn>
        </v-snackbar>

  </v-container>
</template>

<script>
    import Price from './index'

    export default {
        name: "Price",
        data: () => ({
            codeError: true,
            valueError: true,
            priceDialog: false,
            priceEdit: {
                code: '',
                serviceName: '',
                value: ''
            },
            editCategory: false,
            editPrice: false,
            max25chars: v => v.length <= 25 || 'Input too long!',

            categoryHead: [
                {text: 'Категория', value: 'nameCategory'},
                {text: '', value: 'action'},
            ],
            categoryItems: [],

            priceHead: [
                {text: 'Код', value: 'code'},
                {text: 'Наименование услуги', value: 'serviceName'},
                {text: 'Цена', value: 'value'},
                {text: '', value: 'action'}],
            priceItems: [],
            selectRowCategory: '',
            selectRowPrice: {},

            badData: false,
            snacMessage: '',
            snacColor: 'green',
        }),

        mounted() {
            this.initialization()
        },

        computed: {
            lockedCategory() {
                return this.editCategory ? 'Блокировать' : 'Разблокировать'
            }
        },

        methods: {
            initialization() {
                Price.initialization(this)
            },

            lockCategory() {
                this.editCategory = !this.editCategory
            },

            addCategory() {
                let newItem = {id: '', nameCategory: 'Новая категория'}
                this.categoryItems.push(newItem)
                Price.saveCategory(newItem, this)
            },

            // addPrice() {
            //     this.priceItems.push({code: '', serviceName: '', value: ''})
            // },

            saveNewPrice(){
                Price.savePrice(this.priceEdit, this)
                this.close()
            },

            saveCategory(row) {
                Price.saveCategory(row, this)
            },

            savePrice(row) {
                Price.savePrice(row, this)
            },

            saveCode(row) {
                Price.savePrice(row, this)
            },

            saveName(row) {
                Price.savePrice(row, this)
            },

            removePrice() {
                if (confirm("Удалить позицию: " + this.selectRowPrice.serviceName + ' ?')) {
                    Price.removePrice(this.selectRowPrice, this)
                }
            },

            removeCategory() {
                if (confirm("Удалить категорию: " + this.selectRowCategory.nameCategory + ' ?')) {
                    Price.removeCategory(this.selectRowCategory, this)
                }
            },

            rowCategoryClick(row) {
                this.selectRowCategory = row;
                this.editPrice =false;
                Price.getPriceByCategoryId(row.id, this)
            },

            rowPriceClick(row) {
                this.selectRowPrice = row;
                this.editPrice = true
            },

            close(){
              this.priceDialog = false;
              this.priceEdit = {
                  code: '',
                  serviceName: '',
                  value: ''
              }
            },
        },

        watch: {
            'priceEdit.code' : function () {

                const regex = /^[0-9]+$/;
                this.codeError = true;

                if ((regex.exec(this.priceEdit.code)) !== null) {
                    this.codeError = false;
                }
            },

            'priceEdit.value' : function () {
                this.valueError = true;
                const regex = /^[0-9]+.?[0-9]+?$/;
                if ((regex.exec(this.priceEdit.value)) !== null) {
                    this.valueError = false;
                }
            }

        }

    }
</script>

<style scoped>

</style>
