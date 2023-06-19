import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { IconButton } from "@mui/material"
import s from "features/profile/editableSpan/EditableSpan.module.css"
import EditIcon from "@mui/icons-material/Edit"
import Button from "@mui/material/Button"
import { useAppSelector } from "common/hooks"
import Typography from "@mui/material/Typography"

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
        <div>
          <div className={s.input}>
            <TextField variant={"standard"} value={title} onChange={changeTitle} size={"small"} autoFocus />
          </div>
          <div className={s.buttons}>
            <Button onClick={activateViewMode} variant="outlined">
              Save
            </Button>
            <Button onClick={() => setEditMode(false)} variant="outlined" color={"warning"}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <div className={s.name}>
          <Typography className={s.nameText}>{props.value}</Typography>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={activateEditMode} disabled={isLoading}>
            <EditIcon />
          </IconButton>
        </div>
      )}
    </div>
  )
}
