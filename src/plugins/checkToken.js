import Axios from 'axios'
import store from "@/store/index";


export default {
  beforeRoute(to, from, next, page) {
    const axInst = Axios.create({
      baseURL: `http://${window.location.hostname}:8080/api/v1`,
      proxyHeaders: false,
      credentials: false
    })
    let token = store.getters.getToken
    //  console.log(token)
    let cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    let url = "/checkToken?checkToken=" + token
    if (token === cookieToken) {
      store.dispatch('link/SET_PAGE', page)
      next()
    } else {
      next({path: '/login'})
    }

    // axInst.get(url).then((res) => {
    //   if (res.data) {
    //     //   store.state.link.page
    //     store.dispatch('link/SET_PAGE', page).then(r => {
    //     })
    //     next()
    //   } else {
    //     return next({
    //       path: '/login'
    //     })
    //   }
    // }).catch(() => {
    //   console.log("Error")
    // })
  }
  ,

}
