import Axios from 'axios'
import store from "@/store/index";


export default {
  beforeRoute(to, from, next, page) {
    const axInst = Axios.create({
      baseURL: `http://${window.location.hostname}:8080/api/v1`,
      proxyHeaders: false,
      credentials: false
    })
    let token = store.state.user.User.token
    //  console.log(token)
    let cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    let url = '/main/checkToken?token=' + cookieToken
    axInst(url).then((res) => {
        store.dispatch('link/SET_PAGE', page)
        next()
    }).catch((er) => {
      next({path: '/login'})
    })
  }
}
