import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/v1',
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("auth") ? "Bearer " + localStorage.getItem("auth") : null
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return new Promise((resolve, reject) => {
      const originalRequest = error.config
      const refreshToken = localStorage.getItem('refAuth')
      if (error.response && error.response.status === 401 && error.config && !error.config.__isRetryRequest && refreshToken) {
        originalRequest._retry = true

        const response = fetch("http://localhost:3000/v1/auth/token/refresh", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            localStorage.setItem("auth", res.data.accesstoken)

            return axios(originalRequest)
          })
        resolve(response)
      }

      reject(error.response)
    })
  }
)

export default axiosInstance
