import React, { FC, ReactNode, useState } from "react"
import { BasicModal } from "features/modal/BasicModal"
import s from "./AddNewPack.module.css"
import { useFormik } from "formik"
import { Checkbox, FormControlLabel, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { packsThunks } from "features/packs/packs.slice"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { useSearchParams } from "react-router-dom"
import { selectIsLoading } from "app/app.selector"
import { AddPackUploadButton } from "features/modal/AddNewPackModal/AddPackUploadButton/AddPackUploadButton"

type AddNewPackPropsType = {
  children: ReactNode
}

export const AddNewPackModal: FC<AddNewPackPropsType> = ({ children }) => {
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [deckCover, setDeckCover] = useState("")

  const AddPackUploadButtonHandler = (deckCover: string) => {
    setDeckCover(deckCover)
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      private: false,
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.name) {
        errors.name = "Name required"
      }

      return errors
    },
    onSubmit: async (values) => {
      await dispatch(packsThunks.addPack({ name: values.name, private: values.private, deckCover }))
      await dispatch(packsThunks.getPacks(params))
      await setDeckCover("")
      handleClose()
      formik.resetForm()
    },
  })

  return (
    <div>
      <BasicModal
        title={"Add new pack"}
        childrenOpen={<div>{children}</div>}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <div className={s.newPackWrapper}>
          <form onSubmit={formik.handleSubmit} className={s.form}>
            <div className={s.packField}>
              <div>{deckCover && <img src={deckCover} style={{ width: "100px" }} alt="uploadImage" />}</div>
              <TextField
                variant="standard"
                label="Pack Name"
                margin="normal"
                autoComplete="off"
                error={!!formik.touched.name && !!formik.errors.name}
                sx={{ backgroundColor: "white", width: "100%" }}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className={s.packFieldError}>{formik.errors.name}</div>
              ) : null}
            </div>
            <div>
              <AddPackUploadButton onChange={AddPackUploadButtonHandler} />
            </div>
            <div className={s.checkbox}>
              <FormControlLabel
                label={"Private pack"}
                control={<Checkbox checked={formik.values.private} {...formik.getFieldProps("private")} />}
              />
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
                color={"primary"}
                disabled={isLoading}
                sx={{ borderRadius: 6, width: 120 }}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </BasicModal>
    </div>
  )
}
