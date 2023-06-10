import { RootState } from "app/store"

export const selectCardPacksSettings = (state: RootState) => state.packs.cardPacks
export const selectCardPacks = (state: RootState) => state.packs.cardPacks.cardPacks
export const selectMinCardsCount = (state: RootState) => state.packs.cardPacks.minCardsCount
export const selectMaxCardsCount = (state: RootState) => state.packs.cardPacks.maxCardsCount
