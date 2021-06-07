import config from '../config'
import router from '@/router'

const baseURL = config.baseURL;
const axios = require('axios').create({
  baseURL: baseURL,
  timeout: 0,
  withCredentials: true, // 允许跨域携带 cookie
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  maxContentLength: 2000,
  //transformResponse 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) { //data 由服务器提供的响应
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = {};
    }
    if (data.status === 403) {//`status` 来自服务器响应的 HTTP 状态码
      router.push('/login');
    }
    return data;
  }]
})



export const _get = (req) => {
  return axios.get(req.url, {params: req.data})
}

// post
export const _post = (req) => {
  return axios({method: 'post', url: `/${req.url}`, data: req.data})
}

//patch
export const _put = (req) => {
  return axios({method: 'put', url: `/${req.url}`, data: req.data})
}

//delete
export const _delete = (req) => {
  return axios({method: 'delete', url: `/${req.url}`, data: req.data})
}