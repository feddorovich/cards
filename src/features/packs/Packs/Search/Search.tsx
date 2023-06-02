import React, { ChangeEvent, useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import s from "./Search.module.css"

import { useAppSelector } from "common/hooks"

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const Search = function (props: EditableSpanPropsType) {
  const isLoading = useAppSelector((state) => state.app.isLoading)

  let [title, setTitle] = useState(props.value)

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  useEffect(() => {
    props.onChange(title)
  }, [title])

  return (
    <div>
      <div className={s.input}>
        <TextField variant={"standard"} value={title} onChange={changeTitle} />
      </div>
    </div>
  )
}
