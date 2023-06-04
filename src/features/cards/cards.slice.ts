import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import { ArgCardsType, cardsApi, GetCardsResponseType } from "features/cards/cards.api"

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
const addCard = createAppAsyncThunk("cards/addCard", async (cardsPackId: string, { rejectWithValue }) => {
  try {
    await cardsApi.addCard(cardsPackId)
  } catch (e) {
    return rejectWithValue(e)
  }
})
const deleteCard = createAppAsyncThunk("cards/deleteCard", async (cardsPackId: string, { rejectWithValue }) => {
  try {
    await cardsApi.deleteCard(cardsPackId)
  } catch (e) {
    return rejectWithValue(e)
  }
})
const updateCard = createAppAsyncThunk("cards/update", async (cardsPackId: string, { rejectWithValue }) => {
  try {
    await cardsApi.updateCard(cardsPackId)
  } catch (e) {
    return rejectWithValue(e)
  }
})
const gradeCard = createAppAsyncThunk("cards/update", async (cardsPackId: string, { rejectWithValue }) => {
  try {
    await cardsApi.gradeCard(cardsPackId)
  } catch (e) {
    return rejectWithValue(e)
  }
})

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
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cards = action.payload.cards
    })
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = { getCards, addCard, deleteCard, updateCard, gradeCard }
