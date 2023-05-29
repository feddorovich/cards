import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { IconButton } from "@mui/material"
import s from "features/profile/editableSpan/EditableSpan.module.css"
import EditIcon from "@mui/icons-material/Edit"

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
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
          <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        </div>
      ) : (
        <div className={s.name}>
          <span className={s.nameText} onClick={activateEditMode}>
            {props.value}
          </span>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={activateEditMode} className={s.nameBtn}>
            <EditIcon />
          </IconButton>
        </div>
      )}
    </div>
  )
})
