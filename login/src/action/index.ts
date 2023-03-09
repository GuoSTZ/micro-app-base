import { useEffect } from 'react';
import { message } from "antd";
import { useSetAtom, useAtom } from "jotai";
import { publicKeyAtom, isLoginAtom } from "@/atoms";
import { locale } from '@/locales';
import * as Api from "@/api";

export const useIsLoginAtom = (params: object = {}) => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [publicKey, setPublicKey] = useAtom(publicKeyAtom)
  useEffect(() => {
    (async () => {
      const data = await Api.fetchIsLogin(params);
      if (data?.code === 0) {
        setIsLogin(data?.data?.status);
        setPublicKey(data?.data?.publicKey)
      } else {
        message.error(data?.message)
      }
    })()
  }, [])
}

export const fetchLogin = async (params: object = {}, callback: Function, handlerLoading: Function) => {
  const data = await Api.fetchLogin(params);
  if (data?.code === 0) {
    message.success(data?.message)
    callback?.();
  } else {
    message.error(data?.message)
  }
  handlerLoading?.()
}
