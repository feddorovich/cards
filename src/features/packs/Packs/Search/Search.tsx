import React, { ChangeEvent, useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment } from "@mui/material"
import { useSearchParams } from "react-router-dom"

type SearchPropsType = {
  onChange: (newValue: string) => void
  value: string
}

export const Search = function (props: SearchPropsType) {
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  let [title, setTitle] = useState(props.value)

  useEffect(() => {
    if (params.packName === undefined && params.cardQuestion === undefined) {
      setTitle("")
    }
  }, [params.packName, params.cardQuestion])

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.currentTarget.value
    setTitle(newTitle)
    props.onChange(newTitle)
  }

  return (
    <div>
      <div>
        <TextField
          sx={{ backgroundColor: "white", width: "100%" }}
          variant={"outlined"}
          size={"small"}
          value={title}
          onChange={changeTitle}
          placeholder={"English"}
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
