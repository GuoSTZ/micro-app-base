import axios from 'axios';
import { AxiosRequestConfig } from './type'

const instance = axios.create({
  headers: {}
})

export const fetchPost = async (url: string, params: object, config: AxiosRequestConfig<object>) => {
  return await instance.post(url, params, config).then(res => res.data).catch(error => error);
}

export const fetchGet = async (url: string, params: object, config: AxiosRequestConfig<object>) => {
  return await instance.get(url, Object.assign({}, config, {params})).then(res => res.data).catch(error => error);
}

export const fetchBatch = (funcs: (Function | Promise<Function>)[], callback: (...args) => unknown) => {
  return axios.all(funcs).then(axios.spread(callback)).catch(error => error);
}

export const fetchUpload = async (url: string, params: object, config: AxiosRequestConfig<object>) => {
  return await instance.post(url, params, {...config, headers: {...config.headers, 'Content-Type': 'multipart/form-data'}}).then(res => res.data).catch(error => error);
}