import axios from "axios";
import { deleteCookie, getCookie } from "../utils/cookies-helper";


export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

api.interceptors.request.use(async (config) => {
    const token = getCookie('accessToken');
    if (
        token &&
        (!config.headers.non_auth || config.headers.non_auth === "false")

    ) {
        config.headers.Authorization = `Bearer ${token}`;      
        config.headers['Accept-Language'] = "en"
    }
    delete config.headers.non_auth;
    return config;
});

api.interceptors.response.use(
    (response) => {    
      return response.data;
    },
    (error) => {
      const { response } = error;   
      const { status} = response;
      if (status === 401) {      
        deleteCookie('accessToken', '');      
        window.location.href = "/auth/login";
      }
      throw error;
    }
  ) 