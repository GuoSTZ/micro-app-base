import { message } from "antd";
import { useSetAtom } from "jotai";
import { schemaAtom } from "@/atoms";
import * as Api from "@/api";

export const useSchemaAtom = async (params: object = {}) => {
  const schemaSetter = useSetAtom(schemaAtom);
  const data = await Api.fetchSchema(params);
  if (data?.code === 0) {
    schemaSetter(data?.data);
  } else {
    message.error(data?.message)
  }
}