import React, { ChangeEvent } from "react"
import TextField from "@mui/material/TextField"
import s from "./SliderInput.module.css"

type SliderInputPropsType = {
  onChange: (newValue: number) => void
  value: number
  disable?: boolean
}

export const SliderInput = function (props: SliderInputPropsType) {
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.currentTarget.value
    props.onChange(+newTitle)
  }

  return (
    <div>
      <div className={s.input}>
        <TextField
          // sx={{ backgroundColor: "white", width: "100%" }}
          variant={"outlined"}
          size={"small"}
          value={props.value.toString()}
          onChange={changeTitle}
          autoComplete="off"
          type="number"
          disabled={props.disable}
        />
      </div>
    </div>
  )
}
