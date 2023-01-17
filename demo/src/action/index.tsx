import * as Api from "@/api";
import { message } from "antd";

export const fetchDemo = async (params: object = {}) => {
  const data = await Api.fetchDemo(params);
  if(data.status === 200) {
    message.error('请求成功')
  } else {
    message.error(data?.message)
  }
}
