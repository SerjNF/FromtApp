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
              <v-form
                ref="form"
                v-model="form"
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
                        v-model="candidate.login"
                        prepend-icon="person"
                        label="Логин"
                      ></v-select>
                      <v-text-field
                        color="deep-purple"
                        label="Password"
                        name="password"
                        v-model="candidate.password"
                        prepend-icon="lock"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      :disabled="isForm"
                      color="primary"
                      @click="signIn"
                      depressed
                    >Вход
                    </v-btn>

                  </v-card-actions>
                </v-card>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
    <v-snackbar
      bottom="bottom"
      text
      v-model="badPassword">
      {{ message }}
      <v-btn
        color="red"
        text
        @click="badPassword = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable */
    import Axios from 'axios'
    import Login from '@/components/Pages/Login'

    const axInst = Axios.create({
        baseURL: `http://${window.location.hostname}:8080/api/v1`,
        proxyHeaders: false,
        credentials: false
    })
    export default {
        name: 'Login',
        props: {
            source: String
        },
        data: () => ({
            form: false,
            show: false,
            items: [],
            candidate: {
                login: '',
                password: ''
            },
            badPassword: false,
            message: "Неверный пароль",
        }),

        mounted: function () {
            axInst.get(`/general/getLogin`).then((res) => {
                console.log(res);
                this.items = res.data;
            })
        },
        methods: {
            signIn() {
                Login.signin(this, this.candidate, '/')
            },
        },
        computed: {
        isForm :function ()
         {
            return this.candidate.password <= 0 || this.candidate.login <= 0
        }
            }
    }
</script>

<style>
  body {

  }
</style>
