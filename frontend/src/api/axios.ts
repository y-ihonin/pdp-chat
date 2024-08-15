/* eslint-disable no-useless-catch */
import Axios from "axios";
import Cookies from "js-cookie";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_APP_API_URL,
});

axios.interceptors.request.use(
  config => {
    const token = Cookies.get("accessToken")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    config.headers["Content-Type"] = "application/json";

    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default axios;
