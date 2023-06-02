import { instance } from "common/api/common.api"
import { RegisterResponseUserType } from "features/auth/auth.api"

export const packsApi = {
  getPacks: () => {
    return instance.get("cards/pack", {})
  },
}

export type GetPacksResponseType = {
  cardPacks: CardPacksType[]
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
