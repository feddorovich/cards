import React, { ChangeEvent, useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { useAppSelector } from "common/hooks"
import { InputAdornment } from "@mui/material"

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
      <div>
        <TextField
          sx={{ backgroundColor: "white", width: "350px" }}
          variant={"outlined"}
          size={"small"}
          // label={"Provide your text"}
          value={title}
          onChange={changeTitle}
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
