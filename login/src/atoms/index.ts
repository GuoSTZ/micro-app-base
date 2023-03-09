import { atom } from "jotai"

type TData = {}

export const schemaAtom = atom<TData[]>([])

export const isLoginAtom = atom<boolean>(false)

export const publicKeyAtom = atom<string>("")
