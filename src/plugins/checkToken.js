import store from "@/store/index";
import {axInst} from '@/plugins/axInst'

export default {
  beforeRoute(to, from, next, page) {

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
