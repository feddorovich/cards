import React, { ChangeEvent, FC, useState } from "react"
import { CircularProgress, Grid, IconButton, Paper, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./Profile.module.css"
import { Navigate } from "react-router-dom"
import checkEmail from "assets/image/checkEmail.png"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { authThunks } from "features/auth/auth.slice"
import EditIcon from "@mui/icons-material/Edit"
import { EditableSpan } from "features/profile/editableSpan/EditableSpan"

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  // const avatar = useAppSelector((state) => state.auth.profile?.avatar)
  const name = useAppSelector((state) => state.auth.profile?.name)
  const email = useAppSelector((state) => state.auth.profile?.email)
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)
  const dispatch = useAppDispatch()

  const changeProfileNameHandler = () => {
    dispatch(authThunks.changeProfileName("New 1name"))
  }

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  const changeName = (title: string) => {
    console.log(title)
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
              <div className={s.name}>
                <div className={s.nameText}>{name}</div>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={changeProfileNameHandler}
                  className={s.nameBtn}
                >
                  <EditIcon />
                </IconButton>
              </div>
              <div>
                <EditableSpan onChange={changeName} value={"name"} />
              </div>
              <div className={s.email}>{email}</div>
              <div className={s.logout}>
                {isLoggedIn && (
                  <Button color="primary" variant="text" sx={{ borderRadius: 6 }} onClick={logoutHandler}>
                    Log out
                  </Button>
                )}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
