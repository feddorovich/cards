import { RootState } from "app/store"

export const selectCards = (state: RootState) => state.cards.cards.cards
export const selectCardsSettings = (state: RootState) => state.cards.cards
