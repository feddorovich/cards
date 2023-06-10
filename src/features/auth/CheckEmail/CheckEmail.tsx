import React, { FC } from "react"
import { Grid, Paper } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./CheckEmail.module.css"
import { Navigate, NavLink } from "react-router-dom"
import checkEmail from "assets/image/checkEmail.png"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "features/auth/auth.selector"

export const CheckEmail: FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.checkEmail}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>Check Email</div>
              <div className={s.img}>
                <img src={checkEmail} alt="email image" />
              </div>
              <div className={s.text}>We’ve sent an Email with instructions to example@mail.com</div>
              <NavLink to="/login">
                <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6 }}>
                  Back to login
                </Button>
              </NavLink>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
