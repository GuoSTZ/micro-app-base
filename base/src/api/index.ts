import * as FetchUtils from "@/utils/fetch"

export const fetchData = (params: object = {}, config: object = {}) => 
  FetchUtils.fetchGet(`${API_PREFIX}/data`, params, config);
