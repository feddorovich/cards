import React, { FC, ReactNode, useState } from "react"
import { BasicModal } from "features/modal/BasicModal"
import s from "./AddNewCard.module.css"
import { useFormik } from "formik"
import { TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { useSearchParams } from "react-router-dom"
import { selectIsLoading } from "app/app.selector"
import { cardsThunks } from "features/cards/cards.slice"

type AddNewPackPropsType = {
  children: ReactNode
  cardsPack_id: string
}

export const AddNewCardModal: FC<AddNewPackPropsType> = ({ children, cardsPack_id }) => {
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
      private: false,
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.question) {
        errors.question = "Question required"
      }
      if (!values.answer) {
        errors.answer = "Answer required"
      }

      return errors
    },
    onSubmit: async (values) => {
      await dispatch(cardsThunks.addCard({ cardsPack_id, question: values.question, answer: values.answer }))
      await dispatch(cardsThunks.getCards({ cardsPack_id, ...params }))
      handleClose()
      formik.resetForm()
    },
  })

  return (
    <div>
      <BasicModal
        title={"Add new card"}
        childrenOpen={<div>{children}</div>}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <div className={s.wrapper}>
          <form onSubmit={formik.handleSubmit} className={s.form}>
            <div className={s.packField}>
              <TextField
                variant="standard"
                label="Question"
                margin="normal"
                autoComplete="off"
                error={!!formik.touched.question && !!formik.errors.question}
                sx={{ backgroundColor: "white", width: "100%" }}
                {...formik.getFieldProps("question")}
              />
              {formik.touched.question && formik.errors.question ? (
                <div className={s.packFieldError}>{formik.errors.question}</div>
              ) : null}
            </div>
            <div className={s.packField}>
              <TextField
                variant="standard"
                label="Answer"
                margin="normal"
                autoComplete="off"
                error={!!formik.touched.answer && !!formik.errors.answer}
                sx={{ backgroundColor: "white", width: "100%" }}
                {...formik.getFieldProps("answer")}
              />
              {formik.touched.answer && formik.errors.answer ? (
                <div className={s.packFieldError}>{formik.errors.answer}</div>
              ) : null}
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
