import React, { FC, ReactNode, useState } from "react"
import { BasicModal } from "features/modal/BasicModal"
import s from "./DeleteCardModal.module.css"
import Button from "@mui/material/Button"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { useParams, useSearchParams } from "react-router-dom"
import { selectIsLoading } from "app/app.selector"
import Typography from "@mui/material/Typography"
import { cardsThunks } from "features/cards/cards.slice"

type EditPackPropsType = {
  children: ReactNode
  cardId: string
}

export const DeleteCardModal: FC<EditPackPropsType> = ({ children, cardId }) => {
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { packId } = useParams()
  // const packId = document.location.href.split("/")[4].split("?")[0]
  const oldQuestion = useAppSelector((state) =>
    state.cards.cards ? state.cards.cards.cards.find((card) => card._id === cardId)?.question : ""
  )

  // Delete card
  const deleteCardHandler = async () => {
    await dispatch(cardsThunks.deleteCard(cardId))
    dispatch(cardsThunks.getCards({ cardsPack_id: packId ?? "", ...params }))
  }

  return (
    <div>
      <BasicModal
        title={"Delete card"}
        childrenOpen={<div>{children}</div>}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <div className={s.wrapper}>
          <div className={s.text}>
            <Typography variant="h6">
              <p>
                Do you really want to remove <b>{oldQuestion} </b> card?
              </p>
            </Typography>
          </div>
          <div className={s.buttons}>
            <Button
              variant="contained"
              color={"inherit"}
              onClick={handleClose}
              sx={{ borderRadius: 6, backgroundColor: "white", width: 120 }}
            >
              Cancel
            </Button>
            <Button
              type={"submit"}
              variant="contained"
              color={"error"}
              disabled={isLoading}
              onClick={deleteCardHandler}
              sx={{ borderRadius: 6, width: 120 }}
            >
              Delete
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
