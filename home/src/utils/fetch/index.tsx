import axios, { AxiosRequestConfig} from 'axios';

const instance = axios.create({
  headers: {
    'PRIVATE-TOKEN': 'wSd84Z1H3YALYze6qwm_'
  }
})

export const fetchPost = async (url: string, params: object, config: AxiosRequestConfig<object>) => {
  return await instance.post(url, params, config).then(res => res).catch(error => error);
}

export const fetchGet = async (url: string, params: object, config: AxiosRequestConfig<object>) => {
  return await instance.get(url, Object.assign({}, config, {params})).then(res => res).catch(error => error);
}

export const fetchBatch = (funcs: (Function | Promise<Function>)[], callback: (...args) => unknown) => {
  return axios.all(funcs).then(axios.spread(callback)).catch(error => error);
}