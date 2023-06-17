import { instance } from "common/api/common.api"

export const cardsApi = {
  getCards: (arg: ArgCardsType) => {
    const defaultArg = {
      pageCount: 5,
      ...arg,
    }
    return instance.get("cards/card", { params: defaultArg })
  },
  addCard: (card: ArgAddCardType) => {
    return instance.post("cards/card", { card }, {})
  },
  deleteCard: (id: string) => {
    return instance.delete("cards/card", { params: { id } })
  },
  updateCard: (card: ArgUpdateCardType) => {
    return instance.put("cards/card", { card }, {})
  },
  gradeCard: (arg: ArgGradeType) => {
    return instance.put("cards/grade", arg, {})
  },
}

export type ArgCardsType = {
  cardsPack_id: string
  pageCount?: number
}
export type GetCardsResponseType = {
  cards: CardsType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packCreated: string
  packUpdated: string
  packDeckCover?: string
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
  questionImg?: string
  answerImg?: string
}
export type ArgGradeType = {
  grade: number
  card_id: string
}
export type GradeCardResponseType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
export type ArgAddCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  answerImg?: string
  questionImg?: string
}
export type ArgUpdateCardType = {
  _id: string
  question?: string
  answer?: string
  answerImg?: string
  questionImg?: string
}
