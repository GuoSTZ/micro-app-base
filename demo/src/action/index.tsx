import * as Api from "@/api";
import { message } from "antd";

export const fetchPage = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchPage(params);
  if(data.code === 0) {
    callback?.(data.data)
  } else {
    message.error(data?.message)
  }
}

export const fetchFormSchema = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchFormSchema(params);
  if(data.code === 0) {
    callback?.(data.data)
  } else {
    message.error(data?.message)
  }
}

export const fetchDetailSchema = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchDetailSchema(params);
  if(data.code === 0) {
    callback?.(data.data)
  } else {
    message.error(data?.message)
  }
}

export const fetchItem = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchItem(params);
  if(data.code === 0) {
    callback?.(data.data)
  } else {
    message.error(data?.message)
  }
}

export const fetchDelete = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchDelete(params);
  if(data.code === 0) {
    callback?.()
    message.success("操作成功")
  } else {
    message.error(data?.message)
  }
}
