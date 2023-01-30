import * as FetchUtils from "@/utils/fetch"
import { AxiosRequestConfig, AxiosRequestHeaders } from '@/utils/fetch/type'

const defaultConfig = {
  headers: {} as AxiosRequestHeaders
}

export const fetchPage = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/get`, params, config);

export const fetchFormSchema = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/getFormSchema`, params, config);

export const fetchDetailSchema = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/getDetailSchema`, params, config);

export const fetchItem = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/getItem`, params, config);

export const fetchDelete = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchPost(`${API_PREFIX}/demo/delete`, params, config);

export const fetchSave = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchPost(`${API_PREFIX}/demo/save`, params, config);

export const fetchUpdate = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchPost(`${API_PREFIX}/demo/update`, params, config);