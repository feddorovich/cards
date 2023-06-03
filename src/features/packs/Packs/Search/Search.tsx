import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment } from "@mui/material"

type EditableSpanPropsType = {
  onChange: (newValue: string) => void
}

export const Search = function (props: EditableSpanPropsType) {
  let [title, setTitle] = useState("")

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.currentTarget.value
    setTitle(newTitle)
    props.onChange(newTitle)
  }

  return (
    <div>
      <div>
        <TextField
          sx={{ backgroundColor: "white", width: "350px" }}
          variant={"outlined"}
          size={"small"}
          value={title}
          onChange={changeTitle}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  )
}
