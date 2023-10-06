import axios from "axios"
const api = axios.create({
    baseURL:"https://api.hanling.space",
    timeout:30000,
})
//拦截器
 // axios拦截器
  // 请求拦截


api.defaults.withCredentials = true;

export default api;