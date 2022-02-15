import axios from 'axios'

const request_login = axios.create({
  baseURL: '/login-api',
  timeout: 5000,
})

//请求拦截器
request_login.interceptors.request.use((config) => {
  
  
  return config
})

//响应拦截器
request_login.interceptors.response.use(
  res => {
    return res
  },
  err => {
    return Promise.reject(new Error('response failed!'))
  }
)

export default request_login