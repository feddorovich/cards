import React, { FC } from "react"
import { Grid, Paper } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./Profile.module.css"
import { Link } from "react-router-dom"
import checkEmail from "assets/image/checkEmail.png"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { authThunks } from "features/auth/auth.slice"

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }
  return (
    <div className={s.wrapper}>
      <div className={s.profile}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>Personal Information</div>
              <div className={s.img}>
                <img src={checkEmail} alt="email image" />
              </div>
              <div className={s.name}>Name</div>
              <div className={s.email}>example@mail.com</div>
              <Link to="/login">
                {isLoggedIn && (
                  <Button color="primary" variant="text" sx={{ borderRadius: 6 }} onClick={logoutHandler}>
                    Log out
                  </Button>
                )}
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
