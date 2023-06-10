import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import { ArgAddPacksType, ArgPacksType, GetPacksResponseType, packsApi } from "features/packs/packs.api"

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
const addPack = createAppAsyncThunk("packs/addPack", async (arg: ArgAddPacksType, { rejectWithValue }) => {
  try {
    await packsApi.addPack(arg)
  } catch (e) {
    return rejectWithValue(e)
  }
})
const deletePack = createAppAsyncThunk("packs/delete", async (id: string, { rejectWithValue }) => {
  try {
    await packsApi.deletePack(id)
  } catch (e) {
    return rejectWithValue(e)
  }
})
const editPack = createAppAsyncThunk("packs/edit", async (id: string, { rejectWithValue }) => {
  try {
    await packsApi.editPack(id)
  } catch (e) {
    return rejectWithValue(e)
  }
})

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: {} as GetPacksResponseType,
  },
  reducers: {
    setEmptyPacks: (state) => {
      state.cardPacks = {} as GetPacksResponseType
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.cardPacks = action.payload.cardPacks
    })
  },
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { getPacks, addPack, deletePack, editPack }
