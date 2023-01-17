import * as FetchUtils from "@/utils/fetch"

export const fetchDemo = (params: object = {}, config: object = {}) => 
  FetchUtils.fetchGet(`${API_PREFIX}/demo`, params, config);
