import { instance } from "common/api/common.api"

export const cardsApi = {
  getPacks: (arg: ArgCardsType) => {
    const defaultArg = {
      pageCount: 10,
      ...arg,
    }
    return instance.get("/cards/card", { params: defaultArg })
  },
}

export type ArgCardsType = {
  cardsPack_id: string
}

export type GetCardsResponseType = {
  cards: CardsType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}

export type CardsType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  type: string
  rating: number
  created: string
  updated: string
  __v: number
}
