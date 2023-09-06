import { message } from "antd";
import * as Api from "@/api";
import { reducer } from '@/reducer';
import { Loading, Param } from '@/store/core/injectAction';

export const actionStatus = {
  fetchPage: [Param, Loading],
}

export const fetchPage = async (params: object = {}) => {
  const data = await Api.fetchPage(params);
  if (data.code === 0) {
    const { current, total, pageSize } = data.data
    /** 出现分页参数有误的情况，需要重新发送请求 */
    if (total !== 0 && total / pageSize + 1 <= current) {
      fetchPage({ ...params, current: current - 1, pageSize })
      return
    }
    reducer.savePage(data.data)
  } else {
    message.error(data?.message)
  }
}
