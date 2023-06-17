import React, { ChangeEvent, FC } from "react"
import s from "./CardUploadButton.module.css"
import { appActions } from "app/app.slice"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectIsLoading } from "app/app.selector"
import Button from "@mui/material/Button"

type AddPackUploadButtonPropsType = {
  title: string
  onChange: (ava: string) => void
}

export const CardUploadButton: FC<AddPackUploadButtonPropsType> = (props) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 100000) {
        if (file.type.startsWith("image/")) {
          convertFileToBase64(file, async (file64: string) => {
            props.onChange(file64)
          })
        } else {
          dispatch(appActions.setError({ error: "The selected file is not an image." }))
        }
      } else {
        dispatch(appActions.setError({ error: "The file is too large. File size up to 100 kb" }))
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const file64 = reader.result as string
      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={s.wrapper}>
      <label className={s.uploadButton}>
        <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
        <Button
          component="span"
          disabled={isLoading}
          sx={{ width: "100%", margin: "10px 0 0" }}
          variant={"outlined"}
          color={"info"}
        >
          {props.title}
        </Button>
      </label>
    </div>
  )
}
