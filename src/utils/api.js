import axios from 'axios'
import { BASE_URL } from './url'

import { getToken, removeToken } from './auth'

// 创建axios示例
const API = axios.create({
  baseURL: BASE_URL
})

//请求拦截器
API.interceptors.request.use(config => {
  const { url } = config
  if (url.startsWith('/user') && !url.startsWith('/user/login') && !url.startsWith('/user/registered')) {
    // 添加请求头
    config.headers.Authorization = getToken()
  }
  return config
})

//响应拦截器
API.interceptors.response.use(res => {
  console.log(res)
  const { status } = res.data
  if (status === 400) {
    // 状态码等于 400 ，说明 token 失效，直接移除 token 即可
    removeToken()
  }
  return res
})

export { API }