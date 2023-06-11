import React, { FC, useEffect, useState } from "react"
import { CircularProgress, Grid, Paper } from "@mui/material"
import s from "./Learn.module.css"
import { Navigate, NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "common/hooks"
import Button from "@mui/material/Button"
import { packsThunks } from "features/packs/packs.slice"
import { cardsThunks } from "features/cards/cards.slice"
import { selectCards } from "features/cards/cards.selector"
import { selectIsLoggedIn } from "features/auth/auth.selector"
import { CardsType } from "features/cards/cards.api"
import { CardPacksType } from "features/packs/packs.api"

export const Learn: FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const packId = document.location.href.split("/")[4].split("?")[0]
  const pack: CardPacksType | undefined = useAppSelector((state) =>
    state.packs.cardPacks.cardPacks ? state.packs.cardPacks.cardPacks.find((pack) => pack._id === packId) : undefined
  )
  const cards = useAppSelector(selectCards)
  let [card, setCard] = useState<CardsType>()
  let [showAnswer, setShowAnswer] = useState<boolean>(false)
  // console.log(pack)

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        await dispatch(packsThunks.getPacks({}))
        await dispatch(cardsThunks.getCards({ cardsPack_id: packId }))
      }
    }
    fetchData()
  }, [isLoggedIn])

  useEffect(() => {
    if (cards !== undefined) {
      setCard(getCard(cards))
    }
  }, [cards])

  const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce(
      (acc: { sum: number; id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
        return { sum: newSum, id: newSum < rand ? i : acc.id }
      },
      { sum: 0, id: -1 }
    )

    return cards[res.id + 1]
  }

  if (!cards) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  const nextOnclickHandler = () => {
    setShowAnswer(false)
    setCard(getCard(cards))
  }

  return (
    <div className={s.wrapper}>
      <div className={s.back}>
        <NavLink to={"/"}>← Back to Packs List</NavLink>
      </div>
      <div className={s.title} style={{ whiteSpace: "pre" }}>
        Learn <b>{pack?.name}</b> ({pack?.cardsCount}
        {pack?.cardsCount === 1 ? <span> card</span> : <span> cards</span>})
      </div>
      <div className={s.body}>
        <Grid container justifyContent={"center"}>
          <Grid item sx={{ width: "450px" }}>
            <Paper className={s.paper}>
              <div className={s.question}>
                <b>Question</b>: {card?.question}
              </div>
              <div className={s.quantity}>
                Number of attempts to answer the question: <b>{card?.shots}</b>
              </div>
              {!showAnswer && (
                <div className={s.showAnswer}>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ borderRadius: 6 }}
                    onClick={() => setShowAnswer(true)}
                  >
                    Show answer
                  </Button>
                </div>
              )}
              {showAnswer && (
                <div className={s.next}>
                  <Button color="primary" variant="contained" sx={{ borderRadius: 6 }} onClick={nextOnclickHandler}>
                    Next
                  </Button>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
