import * as FetchUtils from "@/utils/fetch"
import { AxiosRequestConfig, AxiosRequestHeaders } from '@/utils/fetch/type'

const defaultConfig = {
  headers: {} as AxiosRequestHeaders
}

export const fetchPage = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/get`, params, config);

export const fetchSchema = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/getSchema`, params, config);

export const fetchItem = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/getItem`, params, config);

export const fetchDelete = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchPost(`${API_PREFIX}/demo/delete`, params, config);

export const fetchSave = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchPost(`${API_PREFIX}/demo/save`, params, config);

export const fetchUpdate = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchPost(`${API_PREFIX}/demo/update`, params, config);

export const fetchSchemaList = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/schema/list`, params, config);

export const fetchSchemaItem = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo/schema/item`, params, config);

export const fetchSaveSchema = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchUpload(`${API_PREFIX}/demo/schema/save`, params, config);

export const fetchUpdateSchema = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchUpload(`${API_PREFIX}/demo/schema/update`, params, config);