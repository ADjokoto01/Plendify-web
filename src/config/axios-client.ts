import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "@/stores";
// import { verifyAuthentication } from '@/utils';
import { ENV_VARS } from "@/utils/constants";

const instance = axios.create({
  baseURL: `${ENV_VARS.API_BASE_URL}/api/v1`,
});

const CANCELLED_STATUS_CODE = 499;
function errorHandler(error: AxiosError) {
  let { status } = error.response || {};
  status = error.code === "ERR_CANCELED" ? CANCELLED_STATUS_CODE : status;

  if (status === 401) {
    console.log("401", error);
    // verifyAuthentication();
  }

  throw {
    status,
    ...(error?.response?.data || {
      message: error.message || "Sorry, an unexpected error occurred.",
    }),
  };
}

instance.interceptors.request.use(
  (request: InternalAxiosRequestConfig<any>) => {
    const token = useAuthStore.getState()?.token;
    // add currency in header
    // request.headers["X-Currency-Preference"] = "INR";

    if (token) request.headers["Authorization"] = `Bearer ${token}`;

    return request;
  }
);

instance.interceptors.response.use(
  (response) => {
    const setToken = useAuthStore.getState().setToken;
    const { data } = response;
    if (data?.token) setToken(data.token);
    return data;
  },
  (error) => errorHandler(error)
);

export { instance as axiosClient };
