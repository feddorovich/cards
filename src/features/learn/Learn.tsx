import React, { FC, useEffect } from "react"
import { CircularProgress, Grid, Paper } from "@mui/material"
import s from "./Learn.module.css"
import { Navigate, NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "common/hooks"
import Button from "@mui/material/Button"
import { packsThunks } from "features/packs/packs.slice"
import { cardsThunks } from "features/cards/cards.slice"
import { selectCards } from "features/cards/cards.selector"
import { selectIsLoggedIn } from "features/auth/auth.selector"
import { selectIsAppInitialized } from "app/app.selector"

export const Learn: FC = () => {
  const dispatch = useAppDispatch()
  const isAppInitialized = useAppSelector(selectIsAppInitialized)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const packId = document.location.href.split("/")[4].split("?")[0]
  const packName = useAppSelector((state) =>
    state.packs.cardPacks.cardPacks ? state.packs.cardPacks.cardPacks.find((pack) => pack._id === packId)?.name : ""
  )
  const cards = useAppSelector(selectCards)
  console.log(cards)

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        await dispatch(packsThunks.getPacks({}))
        await dispatch(cardsThunks.getCards({ cardsPack_id: packId }))
      }
    }
    fetchData()
  }, [isLoggedIn])

  if (!isAppInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.back}>
        <NavLink to={"/"}>← Back to Packs List</NavLink>
      </div>
      <div className={s.title}>Learn “{packName}”</div>
      <div className={s.body}>
        <Grid container justifyContent={"center"}>
          <Grid item sx={{ width: "450px" }}>
            <Paper className={s.paper}>
              <div className={s.question}>
                <b>Question</b>: 123
              </div>
              <div className={s.quantity}>
                Number of attempts to answer the question: <b>10</b>
              </div>
              <div className={s.showAnswer}>
                <Button color="primary" variant="contained" sx={{ borderRadius: 6 }}>
                  Show answer
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
