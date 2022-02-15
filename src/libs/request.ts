import axios from 'axios'

const request = axios.create({
  baseURL: '/dev-api',
  timeout: 5000,
})

//请求拦截器
request.interceptors.request.use((config) => {
  
  
  return config
})

//响应拦截器
request.interceptors.response.use(
  res => {
    return res
  },
  err => {
    return Promise.reject(new Error('response failed!'))
  }
)

export default request