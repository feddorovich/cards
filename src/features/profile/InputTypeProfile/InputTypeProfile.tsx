import React, { ChangeEvent, useState } from "react"
import { IconButton } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import defaultAva from "assets/image/defaultAva.png"
import s from "./InputTypeProfile.module.css"
import { appActions } from "app/app.slice"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { authThunks } from "features/auth/auth.slice"
import { selectIsLoading } from "app/app.selector"
import { selectAvatar } from "features/auth/auth.selector"

export const InputTypeFile = () => {
  const dispatch = useAppDispatch()
  const avatar = useAppSelector(selectAvatar)
  const isLoading = useAppSelector(selectIsLoading)
  const [ava, setAva] = useState(avatar ? avatar : defaultAva)
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 100000) {
        convertFileToBase64(file, async (file64: string) => {
          await dispatch(authThunks.changeProfileData({ avatar: file64 }))
          setAva(file64)
        })
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

  const errorHandler = () => {
    setIsAvaBroken(true)
    dispatch(appActions.setError({ error: "Wrong file type or corrupted file" }))
  }

  return (
    <div className={s.wrapper}>
      <img src={isAvaBroken ? defaultAva : ava} style={{ width: "100px" }} onError={errorHandler} alt="ava" />
      <label className={s.uploadButton}>
        <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
        <IconButton component="span" disabled={isLoading}>
          <CloudUploadIcon />
        </IconButton>
      </label>
    </div>
  )
}
