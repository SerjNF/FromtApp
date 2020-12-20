<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" lg="3" md="3">
        <v-card class="mr-0">
          <template v-if="editCategory">
            <v-btn color="blue darken-1" text right @click="addCategory">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn color="blue darken-1" text right @click="removeCategory" :disabled="selectRowCategory === ''">
              <v-icon>remove</v-icon>
            </v-btn>
          </template>
          <v-btn color="primary" dark @click="lockCategory">{{lockedCategory}}</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" lg="9" md="9">
        <v-card class="d-flex justify-space-between">
          <v-card class="d-flex justify-start">
            <v-btn color="primary" dark @click="printPrice">
              Скачать прайс
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn color="primary" dark @click="uploadPriceDialog = true">
              Загрузить
            </v-btn>

          </v-card>
          <v-card class="d-flex justify-end">
            <v-btn color="blue darken-1" text right @click="priceDialog = true" :disabled="selectRowCategory === ''">
              <v-icon>add</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <template v-if=editPrice>
              <v-btn color="blue darken-1" text right @click="removePrice">
                <v-icon>remove</v-icon>
              </v-btn>
            </template>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" lg="3" md="3">
        <v-card>
          <v-data-table
            @click:row="rowCategoryClick"
            :headers="categoryHead"
            :items="categoryItems"
            :items-per-page.sync="itemsPerPageCategory"
            :page="pageCategory"
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
                    :rules="[max20chars]"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>

            <template v-slot:footer>
              <footers :itemLength="categoryItems.length"
                       :startItemPerPage="itemsPerPageCategory"
                       @changePage="changePageCatNumber"
                       @changeItemPerPage="changeCatItemPerPag"></footers>
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

      <v-col cols="12" sm="12" lg="9" md="9">

        <v-data-table v-if="selectRowCategory !== ''"
                      @click:row="rowPriceClick"
                      :headers="priceHead"
                      :items="priceItems"
                      :items-per-page.sync="itemsPerPagePrice"
                      :page="pagePrice"
                      hide-default-footer
                      class="elevation-1">
          :calculate-widths="true"
          <template v-slot:footer>
            <footers :itemLength="priceItems.length"
                     :startItemPerPage="itemsPerPagePrice"
                     @changePage="changePagePriceNumber"
                     @changeItemPerPage="changePriceItemPerPag"></footers>
          </template>

          <template v-slot:no-data>
            <span>Нет данных</span>
          </template>

          <template
            v-slot:item.code="props">
            <v-edit-dialog
              :return-value.sync="props.item.code"
              @save="savePrice(props.item)"
              :large="true"
              save-text="Сохранить"
              cancel-text="Закрыть"
            > {{ props.item.code }}
              <template v-slot:input>
                <v-text-field
                  number
                  v-model="props.item.code"
                  :rules="[numberCode, chars3]"
                  label="Редактировать"
                  single-line
                  counte
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>

          <template
            v-slot:item.serviceName="props">
            <v-edit-dialog
              :return-value.sync="props.item.serviceName"
              @save="savePrice(props.item)"
              :large="true"
              save-text="Сохранить"
              cancel-text="Закрыть"
            > {{ props.item.serviceName }}
              <template v-slot:input>
                <v-textarea
                  v-model="props.item.serviceName"
                  :rules="[max200chars]"
                  label="Редактировать"
                  single-line
                  counter
                ></v-textarea>
              </template>
            </v-edit-dialog>
          </template>

          <template
            v-slot:item.article="props">
            <v-edit-dialog
              :return-value.sync="props.item.article"
              @save="savePrice(props.item)"
              :large="true"
              save-text="Сохранить"
              cancel-text="Закрыть"
            > {{ props.item.article }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.article"
                  :rules="[articleChars]"
                  label="Редактировать"
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
                  :rules="[numberValue, max20chars]"
                  label="Редактировать"
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
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      :error="articleError"
                      prepend-icon="how_to_reg"
                      v-model="priceEdit.article" label="Артикль"
                      @keyup.enter="saveNewPrice"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      :error="codeError"
                      :rules="[chars3]"
                      prepend-icon="how_to_reg"
                      v-model="priceEdit.code" label="Код"
                      @keyup.enter="saveNewPrice"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :error="priceEdit.serviceName.length < 3"
                      prepend-icon="how_to_reg"
                      v-model="priceEdit.serviceName" label="Наименование"
                      @keyup.enter="saveNewPrice"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
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
              <v-btn color="blue darken-1" text @click="saveNewPrice" :disabled="codeError || valueError">Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="uploadPriceDialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="headline">Загрузка прайса</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <template>
                  <v-file-input
                    show-size
                    counter
                    chips
                    label="File input"
                    ref="file"
                    v-model="file"
                  ></v-file-input>
                </template>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="uploadPriceDialog = false">Закрыть</v-btn>
              <v-btn color="blue darken-1" text @click="uploadPrice" :disabled="file === null">Загрузить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-snackbar
      bottom="bottom"
      :timeout="timeOut"
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
    import Footer from '@/components/Pages/Admin/Footer/Footer.vue'
    import Price from './index'

    export default {
        components: {
            footers: Footer
        },
        name: "Price",
        data: () => ({
            pageCategory: 1,
            itemsPerPageCategory: 10,
            pagePrice: 1,
            itemsPerPagePrice: 20,
            codeError: true,
            articleError: true,
            valueError: true,
            priceDialog: false,
            priceEdit: {
                code: '',
                article: '',
                serviceName: '',
                value: ''
            },
            editCategory: false,
            editPrice: false,
            chars3: v => v.length === 3 || '3 знака',
            max20chars: v => v.length <= 20 || 'Превышена длина',
            max100chars: v => v.length <= 100 || 'Превышена длина',
            max200chars: v => v.length <= 200 || 'Превышена длина',
            numberCode: v => /^[0-9]+$/.exec(v) != null || 'Введите число',
            numberValue: v => /^[0-9]+[.]?[0-9]+$/.exec(v) != null || 'Введите число',
            articleChars: v => /^[A-ZА-Я][0-9]{2}.[0-9]{2,3}.[0-9]{3}(.[0-9]{3})?$/.exec(v) != null || 'Неверный артикль',
            categoryHead: [
                {text: '№', value: 'pos'},
                {text: 'Категория', value: 'nameCategory'},
                {text: '', value: 'action'},
            ],
            categoryItems: [],
            max25chars: 25,
            priceHead: [
                {text: '№', value: 'code'},
                {text: 'Артикль', value: 'article'},
                {text: 'Наименование услуги', value: 'serviceName'},
                {text: 'Цена', value: 'value'},
                {text: '', value: 'action'}],
            priceItems: [],
            selectRowCategory: '',
            selectRowPrice: {},
            uploadPriceDialog: false,
            badData: false,
            snacMessage: '',
            snacColor: 'green',
            file: null,
            timeOut: 2000
        }),

        mounted() {
            this.initialization()
        },

        computed: {
            lockedCategory() {
                return this.editCategory ? 'Блокировать' : 'Редактировать'
            }
        },

        methods: {
            initialization() {
                Price.initialization(this)
            },

            changePageCatNumber(p) {
                this.pageCategory = p
            },

            changeCatItemPerPag(i) {
                this.itemsPerPageCategory = i
            },

            changePagePriceNumber(p) {
                this.pagePrice = p
            },

            changePriceItemPerPag(i) {
                this.itemsPerPagePrice = i
            },

            lockCategory() {
                this.editCategory = !this.editCategory
            },

            addCategory() {
                let newItem = {id: '', nameCategory: 'Новая категория'}
                this.categoryItems.push(newItem)
                Price.saveCategory(newItem, this)
            },

            saveNewPrice() {
                Price.savePrice(this.priceEdit, this)
                this.close()
            },

            saveCategory(row) {
                Price.saveCategory(row, this)
            },

            savePrice(row) {
                Price.savePrice(row, this)
            },

            printPrice() {
                Price.printPrice()
            },

            uploadPrice() {
                Price.uploadPrice(this)
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
                this.editPrice = false;
                Price.getPriceByCategoryId(row.id, this)
            },

            rowPriceClick(row) {
                this.selectRowPrice = row;
                this.editPrice = true
            },

            close() {
                this.priceDialog = false;
                this.priceEdit = {
                    code: '',
                    article: '',
                    serviceName: '',
                    value: ''
                }
            },
        },

        watch: {
            'priceEdit.code': function () {
                const regex = /^[0-9]{3}$/;
                this.codeError = (regex.exec(this.priceEdit.code)) === null;
            },

            'priceEdit.article': function () {
                const regex = /^[A-ZА-Я][0-9]{2}.[0-9]{2,3}.[0-9]{3}(.[0-9]{3})?$/;
                this.priceEdit.article = this.priceEdit.article.replace(/,/, ".")
                this.articleError = (regex.exec(this.priceEdit.article)) === null;
            },

            'priceEdit.value': function () {
                this.valueError = true;
                this.priceEdit.value = this.priceEdit.value.replace(/,/, ".")
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
