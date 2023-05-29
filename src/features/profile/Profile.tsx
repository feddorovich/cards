import React, { FC } from "react"
import { CircularProgress, Grid, Paper } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./Profile.module.css"
import { Link, Navigate } from "react-router-dom"
import checkEmail from "assets/image/checkEmail.png"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { authThunks } from "features/auth/auth.slice"

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  // const avatar = useAppSelector((state) => state.auth.profile?.avatar)
  const name = useAppSelector((state) => state.auth.profile?.name)
  const email = useAppSelector((state) => state.auth.profile?.email)
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)
  const dispatch = useAppDispatch()

  const changeProfileNameHandler = () => {
    dispatch(authThunks.changeProfileName("New name 5"))
  }

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  if (!isAppInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
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
              <div className={s.name}>{name}</div>
              <div className={s.email}>{email}</div>
              <Button color="primary" variant="text" sx={{ borderRadius: 6 }} onClick={changeProfileNameHandler}>
                ChangeName
              </Button>
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
