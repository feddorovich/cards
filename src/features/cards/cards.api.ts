import { instance } from "common/api/common.api"

export const cardsApi = {
  getCards: (arg: ArgCardsType) => {
    const defaultArg = {
      pageCount: 5,
      ...arg,
    }
    return instance.get("cards/card", { params: defaultArg })
  },
  addCard: (cardsPack_id: string) => {
    return instance.post("cards/card", { card: { cardsPack_id: cardsPack_id } }, {})
  },
  deleteCard: (cardsPack_id: string) => {
    return instance.delete("cards/card", { params: { id: cardsPack_id } })
  },
  updateCard: (cardsPack_id: string) => {
    return instance.put(
      "cards/card",
      {
        card: {
          _id: cardsPack_id,
          question: "new question",
          answer: "answer",
        },
      },
      {}
    )
  },
  gradeCard: (cardsPack_id: string) => {
    return instance.put(
      "cards/grade",
      {
        grade: 1,
        card_id: cardsPack_id,
      },
      {}
    )
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
