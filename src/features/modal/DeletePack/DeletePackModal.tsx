import React, { FC, ReactNode, useState } from "react"
import { BasicModal } from "features/modal/BasicModal"
import s from "./DeletePack.module.css"
import { useFormik } from "formik"
import { Checkbox, FormControlLabel, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { packsThunks } from "features/packs/packs.slice"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { useSearchParams } from "react-router-dom"
import { selectIsLoading } from "app/app.selector"

type EditPackPropsType = {
  children: ReactNode
  _id: string
}

export const DeletePackModal: FC<EditPackPropsType> = ({ children, _id }) => {
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
            <p>Do you really want to remove Pack Name? </p>
            <p>All cards will be deleted.</p>
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
