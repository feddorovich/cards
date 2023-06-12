import React, { FC, ReactNode, useState } from "react"
import { BasicModal } from "features/modal/BasicModal"
import s from "./DeletePackModal.module.css"
import Button from "@mui/material/Button"
import { packsThunks } from "features/packs/packs.slice"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { useNavigate, useSearchParams } from "react-router-dom"
import { selectIsLoading } from "app/app.selector"
import Typography from "@mui/material/Typography"
import { cardsThunks } from "features/cards/cards.slice"

type EditPackPropsType = {
  children: ReactNode
  _id: string
}

export const DeletePackModal: FC<EditPackPropsType> = ({ children, _id }) => {
  const navigate = useNavigate()
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const packName = useAppSelector((state) =>
    state.packs.cardPacks.cardPacks ? state.packs.cardPacks.cardPacks.find((pack) => pack._id === _id)?.name : ""
  )

  const deletePackHandler = async () => {
    await dispatch(packsThunks.deletePack(_id))
    await dispatch(packsThunks.getPacks(params))
    if (Object.keys(params).length === 0) {
      navigate("/")
    }
  }

  return (
    <div>
      <BasicModal
        title={"Delete pack"}
        childrenOpen={<div>{children}</div>}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <div className={s.wrapper}>
          <div className={s.text}>
            <Typography variant="h6">
              <p>
                Do you really want to remove <b>{packName}</b> ?
              </p>
              <p>All cards will be deleted.</p>
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
              onClick={deletePackHandler}
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
