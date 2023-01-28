import * as Api from "@/api";
import { message } from "antd";

export const fetchDemo = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchDemo(params);
  if(data.code === 0) {
    callback?.(data.data)
  } else {
    message.error(data?.message)
  }
}
