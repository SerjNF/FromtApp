import Axios from 'axios'
import router from '@/router'
import store from '@/store/index'

const axInst = Axios.create({
  baseURL: `http://${window.location.hostname}:8080/api/v1`,
  proxyHeaders: false,
  credentials: false
})

export default {

  currentUser: {authenticated: false},
  /* eslint-disable */
  signin(context, credentials, redirect) {
    axInst({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      },
      url: "/login",
      data: credentials,
    }).then((data) => {
      if (data.status === 200) {
        console.log(store)
        let token = data.data.value
        context.$cookie.set('token', token, '1D');
        store.dispatch('GET_USER', token)
        if (redirect) router.push(redirect)
      }
    }).catch(() => {
      context.badPassword = true
      console.log("bad request")
    })
  },

  checkAuthentication() {
    const token = document.cookie
    this.currentUser.authenticated = !!token
  },

  getAuthenticationHeader(context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}

