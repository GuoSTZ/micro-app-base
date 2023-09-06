import * as FetchUtils from "@/utils/fetch"
import { AxiosRequestConfig, AxiosRequestHeaders } from '@/utils/fetch/type'

const defaultConfig = {
  headers: {} as AxiosRequestHeaders
}

export const fetchPage = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/database/list`, params, config);