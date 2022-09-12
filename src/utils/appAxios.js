import axios from "axios";
import store from "@/store";
const _isAuthenticated = store.getters._isAuthenticated;
const appAxios = axios.create({
  baseURL: "http://147.182.247.5:4001/v1",
});

appAxios.interceptors.request.use(
  function (config) {
    const token = "Bearer " + store.getters.token;
    if (!_isAuthenticated) {
      config.headers = {
        Authorization: token,
      };
    }
    return config;
  },
  function (error) {
    console.log("error !!!!", error);
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  function (response) {
    console.log("response", response);
    return response;
  },
  function (error) {
    console.log(error, "error");

    if (error.response.status === 401 && _isAuthenticated) {
      const refreshToken = "Bearer " + store.getters.refreshToken;
      appAxios
        .post(
          "/auth/refresh",
          {},
          {
            headers: {
              Authorization: refreshToken,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
    return Promise.reject(error);
  }
);

export default appAxios;
