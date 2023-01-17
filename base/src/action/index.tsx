import * as Api from "@/api";
import { message } from "antd";

export const fetchData = async (params: object = {}, callback?: Function) => {
  const data = await Api.fetchData(params);
  if(data.status === 200) {
    message.error('请求成功')
  } else {
    message.error(data?.message)
  }
}
