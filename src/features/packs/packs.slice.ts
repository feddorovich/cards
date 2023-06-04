import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import { ArgPacksType, GetPacksResponseType, packsApi } from "features/packs/packs.api"

const getPacks = createAppAsyncThunk<{ cardPacks: GetPacksResponseType }, ArgPacksType>(
  "packs/getPacks",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await packsApi.getPacks(arg)
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload.cardPacks
    })
  },
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { getPacks }
