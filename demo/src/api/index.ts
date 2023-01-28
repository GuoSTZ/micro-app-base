import * as FetchUtils from "@/utils/fetch"
import { AxiosRequestConfig, AxiosRequestHeaders } from '@/utils/fetch/type'

const defaultConfig = {
  headers: {} as AxiosRequestHeaders
}

export const fetchDemo = (params: object = {}, config: AxiosRequestConfig = defaultConfig) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo`, params, config);
