import * as Api from "@/api";
import { message } from "antd";

export const fetchSchema = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchSchema(params);
  if(data.code === 0) {
    callback?.(data.data)
  } else {
    message.error(data?.message)
  }
}