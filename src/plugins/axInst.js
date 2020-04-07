import Axios from "axios";

export const axInst = Axios.create({
 baseURL: `http://${window.location.hostname}:8080/api/v1`,
 //  baseURL: `http://192.168.0.180:8080/api/v1`,
  proxyHeaders: false,
  credentials: false
});

