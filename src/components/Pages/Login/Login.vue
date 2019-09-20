<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"

                  flat
                >
                  <v-toolbar-title>Вход в приложение</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-select
                      :items="items"
                      prepend-icon="person"
                      label="Логин"
                    ></v-select>
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  props: {
    source: String
  },
  data: () => ({
    // drawer: null
    items: ['Foo', 'Bar', 'Fizz', 'Buzz']
  }),
  mounted () {
    // eslint-disable-next-line no-undef
    axios.get(`${LinkManagerAPI}/general/getUsers`).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style>
  body {

  }
</style>
