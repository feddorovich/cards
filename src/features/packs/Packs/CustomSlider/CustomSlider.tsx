import React from "react"
import s from "./CustomSlider.module.css"
import { Slider, SliderProps } from "@mui/material"

export const CustomSlider: React.FC<SliderProps> = (props) => {
  let value1
  let value2
  if (Array.isArray(props.value)) {
    value1 = props.value[0]
    value2 = props.value[1]
  }
  return (
    <div className={s.slider}>
      <div className={s.value1}>{value1}</div>
      <Slider
        sx={{
          // стили для слайдера
          padding: "15px 0",
          "& .MuiSlider-thumb": {
            backgroundColor: "#fff",
            boxShadow: "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)",
            "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
              boxShadow: "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
            },
          },
        }}
        {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
      />
      <div className={s.value2}>{value2}</div>
    </div>
  )
}
