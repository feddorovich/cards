import React from "react"
import s from "./Error404.module.css"
import error404 from "./404.svg"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const Error404 = () => {
  return (
    <div>
      <div className={s.wrapper}>
        <img src={error404} alt={"404"} className={s.error404} />
        <Typography>Page not found</Typography>
        <Button variant={"outlined"}>Back to home page</Button>
      </div>
    </div>
  )
}

export default Error404
