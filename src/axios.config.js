import axios from 'axios'

const axiosInstance = axios.create({
	baseUrl:'http://localhost:8080',
	timeout: 2000
})

export default axiosInstance