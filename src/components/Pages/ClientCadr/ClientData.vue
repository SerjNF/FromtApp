<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              prepend-icon="how_to_reg"
              label="Фамилия"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              prepend-icon="how_to_reg"
              label="Имя"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              prepend-icon="how_to_reg"
              aria-required="true"
              label="Отчество"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Дата рождения"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1920-01-01"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="12" md="2">
            <v-select
              :items="items"
              label="Пол"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-tooltip top="">
              <template v-slot:activator="{ on }">
                <v-text-field
                  type="tel"
                  prepend-icon="phone"
                  v-on="on"
                   label="Телефон "></v-text-field>
              </template>
              <span>Пример: +71234567890</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Паспорт</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" sm="4" md="2">
                <v-text-field
                  prepend-icon="how_to_reg"
                  label="Серия">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  prepend-icon="how_to_reg"
                  label="Номер"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="3">
                <v-menu
                  ref="menuDoc"
                  v-model="menuDoc"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateDoc"
                      label="Дата выдачи"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="dateDoc"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1920-01-01"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  auto-grow
                  rows="1"
                  row-height="15"
                  label="Кем выдан">
                </v-textarea>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Данные о работе</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-textarea
              auto-grow
              rows="1"
              row-height="15"
              label="Место работы">
            </v-textarea>
            <v-textarea
              auto-grow
              rows="1"
              row-height="15"
              label="Должность">
            </v-textarea>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-card>

  </div>
</template>

<script>
    export default {
        name: "ClientData",
        data: () => {
            return {
                menu: false,
                menuDoc: false,
                date: null,
                dateDoc: null,
                items: ['Ж', 'М'],
            }
        }
    }
</script>

<style scoped>

</style>
