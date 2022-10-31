import axios from "axios";
// import {
//   getToken,
//   getRefreshToken,
//   setToken,
//   removeToken,
//   removeRefreshToken,
// } from "@/utils/auth";

const baseDomain = process.env.VUE_APP_API_GRAPHQL_URL;
const apiKey = process.env.VUE_APP_API_KEY;
export const baseURL = `${baseDomain}`;
export const customHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const instance = axios.create({
  baseURL: baseURL,
  header: customHeaders,
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // const token = getToken();
    // if (token) {
    //   config.headers.authorization = `Bearer ${token}`;
    // }
    config.headers["x-api-key"] = apiKey;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status === 500) {
      return Promise.reject("システムエラーが発生しました");
    }
    if (error.response.status === 403) {
      return Promise.reject("この機能を実行する権限がありません");
    }

    if (error.response.status === 400) {
      return Promise.reject(error.response.data);
    }

    // do something with request error
    if (error.response.status === 401) {
      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      // axios.interceptors.response.eject(instance);
      // return instance({
      //   url: "/auth/refresh-token",
      //   method: "post",
      //   data: { refreshToken: getRefreshToken() },
      // })
      //   .then(({ data }) => {
      //     const { accessToken } = data.data.authToken;
      //     setToken(accessToken);
      //     error.response.config.headers.authorization = `Bearer ${accessToken}`;
      //     return axios(error.response.config);
      //   })
      //   .catch((error) => {
      //     removeToken();
      //     removeRefreshToken();
      //     location.reload();
      //     if (error.status && error.status.code === 403) {
      //       return Promise.reject("この機能を実行する権限がありません");
      //     } else {
      //       return Promise.reject(error);
      //     }
      //   });
    }
    if (
      error.response &&
      error.response.config &&
      error.response.config.responseType &&
      error.response.config.responseType === "blob"
    ) {
      return error.response.data.text().then((v) => {
        return Promise.reject(JSON.parse(v).message || "Blob 形式を返すエラー");
      });
    }

    const errorMessage =
      error.response && error.response.data && error.response.data.status
        ? error.response.data.status.result
        : "";
    return Promise.reject(errorMessage || "エラーが発生しました");
  }
);

export default instance;
