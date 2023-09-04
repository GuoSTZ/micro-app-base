import { message } from "antd";
import * as Api from "@/api";
import { Loading, Param } from '@/store/core/injectAction'

export const actionStatus = {
  fetchPage: [Param, Loading],
}

export const fetchPage = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchPage(params);
  if(data.code === 0) {
    callback?.(data.data)
  } else {
    message.error(data?.message)
  }
}
