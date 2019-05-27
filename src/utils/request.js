// import axios from 'axios'
// import { notification } from 'ant-design-vue';

// function request(option) {
//   return axios(option).then(res => {
//     return res
//   }).catch(error => {
//     const {response: {status, statusText}} = error
//     notification.error({
//       message: '403',
//       description: '你没有权限访问，请联系管理员咨询。'
//     })
//     return Promise.reject(error)
//   })
// }

// export default request

import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { notification } from 'ant-design-vue'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 6000
})
console.log(process.env)
// request拦截器
service.interceptors.request.use(
  config => {
    // const token = Vue.ls.get(ACCESS_TOKEN)
    // if (token) {
    //   config.headers['Authorization'] = 'Atlantic' + token // 让每个请求都加上自定义token
    // }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(err)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code != 0) {
      // 401: token 过期
      if (res.code == 401) {
        notification.error({
          message: '请求失败',
          description: '登录已失效，请重新登录'
        })
        // 从新请求登录接口
      }
      notification.error({
        message: '请求失败',
        description: res.msg
      })
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log(error)
    let msg = '网络出错了'
    if (error.response && error.response.data && error.response.data.msg) {
      msg = error.response.data.msg
    }
    notification.error({
      message: '请求失败',
      description: msg
    })
    return Promise.reject(error)
  }
)
export default service