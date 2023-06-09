import React, { FC, useEffect, useState } from "react"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import CircularProgress from "@mui/material/CircularProgress"
import s from "./Learn.module.css"
import { Navigate, NavLink, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "common/hooks"
import Button from "@mui/material/Button"
import { packsThunks } from "features/packs/packs.slice"
import { cardsThunks } from "features/cards/cards.slice"
import { selectCards } from "features/cards/cards.selector"
import { selectIsLoggedIn } from "features/auth/auth.selector"
import { CardsType } from "features/cards/cards.api"
import { CardPacksType } from "features/packs/packs.api"
import { selectIsLoading } from "app/app.selector"

export const Learn: FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isLoading = useAppSelector(selectIsLoading)
  const { packId } = useParams()
  // const packId = document.location.href.split("/")[4].split("?")[0]
  const pack: CardPacksType | undefined = useAppSelector((state) =>
    state.packs.cardPacks.cardPacks ? state.packs.cardPacks.cardPacks.find((pack) => pack._id === packId) : undefined
  )
  const cards = useAppSelector(selectCards)
  let [card, setCard] = useState<CardsType>()
  let [showAnswer, setShowAnswer] = useState<boolean>(false)

  // Radio group
  const options = [
    { value: 1, label: "Did not know the answer" },
    { value: 2, label: "Had a vague idea" },
    { value: 3, label: "Had some knowledge but unsure" },
    { value: 4, label: "Had a good understanding" },
    { value: 5, label: "Knew the answer" },
  ]
  const [selectedValue, setSelectedValue] = useState<number>(0)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(+event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        await dispatch(cardsThunks.getCards({ cardsPack_id: packId ? packId : "" }))
        dispatch(packsThunks.getPacks({ user_id: card?.user_id, pageCount: 100 }))
      }
    }
    fetchData()
  }, [isLoggedIn])

  useEffect(() => {
    const fetchData = async () => {
      if (cards !== undefined) {
        await setCard(getCard(cards))
      }
    }
    fetchData()
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

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (card?.question === undefined || pack?.name === undefined) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  const nextOnclickHandler = async () => {
    if (card) {
      await dispatch(cardsThunks.gradeCard({ grade: selectedValue, card_id: card?._id }))
    }
    setSelectedValue(0)
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
              {card.questionImg ? (
                <div className={s.questionImg}>
                  <img src={card.questionImg} alt="questionImg" />
                </div>
              ) : (
                <div className={s.question}>
                  <b>Question</b>: {card?.question}
                </div>
              )}
              <div className={s.quantity}>
                Number of attempts to answer the question: <b>{card?.shots}</b>
              </div>
              {!showAnswer && (
                <div className={s.showAnswer}>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ borderRadius: 6 }}
                    disabled={isLoading}
                    onClick={() => setShowAnswer(true)}
                  >
                    Show answer
                  </Button>
                </div>
              )}
              {showAnswer && (
                <div>
                  {card.answerImg ? (
                    <div className={s.answerImg}>
                      <img src={card.answerImg} alt="answerImg" />
                    </div>
                  ) : (
                    <div className={s.answer}>
                      <b>Answer</b>: {card?.answer}
                    </div>
                  )}
                  <div className={s.rateYourself}>Rate yourself:</div>
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="options" name="options" value={selectedValue} onChange={handleChange}>
                      {options.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <div className={s.next}>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ borderRadius: 6 }}
                      disabled={selectedValue === 0 || isLoading}
                      onClick={nextOnclickHandler}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
