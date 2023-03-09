import * as FetchUtils from "@/utils/fetch"
import { AxiosRequestConfig, AxiosRequestHeaders } from '@/utils/fetch/type'

const defaultConfig = {
  headers: {} as AxiosRequestHeaders
}

export const fetchSchema = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/get`, params, config);

export const fetchIsLogin = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/user/isLogin`, params, config);

export const fetchLogin = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchPost(`${API_PREFIX}/user/login`, params, config);

export const fetchRegister = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchPost(`${API_PREFIX}/user/register`, params, config);