import axios from 'axios'

const axiosInstance = axios.create({
	baseUrl:'http://localhost:8080',
	timeout: 2000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})
axiosInstance.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('token')
    if (token) {
      let token = JSON.parse(token)
      config.headers.Authorization = token
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

export default axiosInstance