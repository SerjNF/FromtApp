import Axios from 'axios'


const axInst = Axios.create({
  baseURL: `http://${window.location.hostname}:8080/api/v1`,
  proxyHeaders: false,
  credentials: false
})

export default {
  beforeRoute (to, from, next){
    const axInst = Axios.create({
      baseURL: `http://${window.location.hostname}:8080/api/v1`,
      proxyHeaders: false,
      credentials: false
    })
    let token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    let url = "/checkToken?checkToken=" + token
    axInst.get(url).then((res) => {
      if(res.data){
        next()
      } else {
        return next({
          path: '/login'
        })
      }
    }).catch(() =>{
      console.log("Error")
    })
  },

}
