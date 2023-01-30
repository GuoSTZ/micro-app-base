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

export const fetchSchema = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchSchema(params);
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

export const fetchSave = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchSave(params);
  if(data.code === 0) {
    callback?.()
    message.success("操作成功")
  } else {
    message.error(data?.message)
  }
}

export const fetchUpdate = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchUpdate(params);
  if(data.code === 0) {
    callback?.()
    message.success("操作成功")
  } else {
    message.error(data?.message)
  }
}

export const fetchSchemaList = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchSchemaList(params);
  if(data.code === 0) {
    callback?.(data.data)
  } else {
    message.error(data?.message)
  }
}

export const fetchSchemaItem = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchSchemaItem(params);
  if(data.code === 0) {
    callback?.(data.data)
  } else {
    message.error(data?.message)
  }
}

export const fetchSaveSchema = async (params: object = {}, callback: Function) => {
  const data = await Api.fetchSaveSchema(params);
  if(data.code === 0) {
    callback?.()
    message.success("操作成功")
  } else {
    message.error(data?.message)
  }
}
