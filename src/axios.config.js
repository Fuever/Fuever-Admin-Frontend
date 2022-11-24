import axios from 'axios'

const axiosInstance = axios.create({
	baseUrl:'http://www.avaqua.love:8080',
	timeout: 2000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest',
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
    console.log(error);
    return Promise.reject(error)
  })

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});

export default axiosInstance