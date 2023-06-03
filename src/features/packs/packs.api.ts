import { instance } from "common/api/common.api"

export const packsApi = {
  getPacks: (arg: ArgPacksType = {}) => {
    return instance.get("cards/pack", { params: arg })
  },
}

export type ArgPacksType = {
  pageCount?: number
  packName?: string
  user_id?: string
  min?: number
  max?: number
}
export type GetPacksResponseType = {
  cardPacks: null | CardPacksType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type CardPacksType = {
  _id: string
  user_id: string
  user_name: string
  name: string
  private: boolean
  path: string
  grade: number
  shots: number
  cardsCount: number
  deckCover: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}
