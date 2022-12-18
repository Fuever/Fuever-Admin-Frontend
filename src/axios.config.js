import axios from 'axios'
// axios.defaults.baseURL = 'http://192.168.31.20:8080'
// axios.defaults.baseURL = 'http://www.avaqua.love:8080'
axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/json';

const axiosInstance = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
})
axiosInstance.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance