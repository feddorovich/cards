import React, { FC, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"

export const Packs: FC = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector((state) => state.packs.cardPacks)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  console.log(cardPacks)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(packsThunks.getPacks())
    }
  }, [isLoggedIn])

  return (
    <div>
      <div>Packs</div>
    </div>
  )
}
