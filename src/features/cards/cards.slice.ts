import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import { ArgCardsType, cardsApi, GetCardsResponseType } from "features/cards/cards.api"

const getCards = createAppAsyncThunk<{ cards: GetCardsResponseType }, ArgCardsType>(
  "cards/getCards",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await cardsApi.getPacks(arg)
      return { cards: res.data }
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cards = action.payload.cards
    })
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
export const cardsThunks = { getCards }
