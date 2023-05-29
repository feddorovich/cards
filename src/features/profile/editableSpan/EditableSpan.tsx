import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { IconButton } from "@mui/material"
import s from "features/profile/editableSpan/EditableSpan.module.css"
import EditIcon from "@mui/icons-material/Edit"
import { useAppSelector } from "app/hooks"
import Button from "@mui/material/Button"

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = function (props: EditableSpanPropsType) {
  const isLoading = useAppSelector((state) => state.app.isLoading)

  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <div>
      {editMode ? (
        <div className={s.input}>
          <TextField variant={"standard"} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
          <Button variant="outlined">Save</Button>
        </div>
      ) : (
        <div className={s.name}>
          <span className={s.nameText}>{props.value}</span>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={activateEditMode}
            className={s.nameBtn}
            disabled={isLoading}
          >
            <EditIcon />
          </IconButton>
        </div>
      )}
    </div>
  )
}
