import axios from "axios";
import { store } from "../../infrastructure/state/store/Store";

const AxiosInstance = (subPath: string = "") => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_GATEWAY_BASE_URL + subPath,
    timeout: 1000,
  });

  instance.interceptors.request.use(function (config) {
    const token = store.getState().auth?.token?.accessToken;
    config.headers.Authorization = "Bearer " + token;
    return config;
  });

  return instance;
};

export default AxiosInstance;
