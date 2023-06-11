import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import {
  ArgAddCardType,
  ArgCardsType,
  ArgGradeType,
  ArgUpdateCardType,
  cardsApi,
  GetCardsResponseType,
  GradeCardResponseType,
} from "features/cards/cards.api"

const getCards = createAppAsyncThunk<{ cards: GetCardsResponseType }, ArgCardsType>(
  "cards/getCards",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await cardsApi.getCards(arg)
      return { cards: res.data }
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
const addCard = createAppAsyncThunk("cards/addCard", async (arg: ArgAddCardType, { rejectWithValue }) => {
  try {
    await cardsApi.addCard(arg)
  } catch (e) {
    return rejectWithValue(e)
  }
})
const deleteCard = createAppAsyncThunk("cards/deleteCard", async (cardId: string, { rejectWithValue }) => {
  try {
    await cardsApi.deleteCard(cardId)
  } catch (e) {
    return rejectWithValue(e)
  }
})
const updateCard = createAppAsyncThunk("cards/update", async (arg: ArgUpdateCardType, { rejectWithValue }) => {
  try {
    await cardsApi.updateCard(arg)
  } catch (e) {
    return rejectWithValue(e)
  }
})
const gradeCard = createAppAsyncThunk<{ updatedGrade: GradeCardResponseType }, any>(
  "cards/update",
  async (arg: ArgGradeType, { rejectWithValue }) => {
    try {
      const res = await cardsApi.gradeCard(arg)
      // console.log(res.data.updatedGrade)
      return { updatedGrade: res.data.updatedGrade }
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const slice = createSlice({
  name: "cards",
  initialState: {
    cards: {} as GetCardsResponseType,
  },
  reducers: {
    setEmptyCards: (state) => {
      state.cards = {} as GetCardsResponseType
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload.cards
      })
      .addCase(gradeCard.fulfilled, (state, action) => {
        // TODO
        // const card = state.cards.cards.find((card) => card._id === action.payload.updatedGrade.card_id)
        // console.log(card)
      })
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = { getCards, addCard, deleteCard, updateCard, gradeCard }
