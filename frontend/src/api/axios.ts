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

// Handle errors
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error && error.response && error.response.status ? error.response.status : null;

    switch (status) {
      case 401:
        if (error.response.request.responseURL.includes("/account/profile/me")) {
          Cookies.remove("accessToken");

          if (["/sign-in"].includes(window.location.pathname)) {
            return;
          }


          window.location.href = "/sign-in";
        }

        return Promise.reject(error);
      default:
        return Promise.reject(error);
    }
  }
);

export default axios;
