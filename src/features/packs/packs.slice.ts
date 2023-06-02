import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import { GetPacksResponseType, packsApi } from "features/packs/packs.api"

const getPacks = createAppAsyncThunk<{ cardPacks: GetPacksResponseType }>(
  "packs/getPacks",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await packsApi.getPacks()
      return { cardPacks: res.data }
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: {} as GetPacksResponseType,
  },
  reducers: {
    setPacks: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload.cardPacks
    })
  },
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { getPacks }
