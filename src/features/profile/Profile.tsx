import React, { FC } from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"
import s from "./Profile.module.css"
import { Navigate, NavLink } from "react-router-dom"
import { authThunks } from "features/auth/auth.slice"
import { EditableSpan } from "features/profile/editableSpan/EditableSpan"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { InputTypeFile } from "features/profile/InputTypeProfile/InputTypeProfile"
import { selectEmail, selectIsLoggedIn, selectName } from "features/auth/auth.selector"
import { selectIsAppInitialized, selectIsLoading } from "app/app.selector"
import Typography from "@mui/material/Typography"
import back from "assets/image/back.png"

export const Profile: FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const name = useAppSelector<string>(selectName)
  const email = useAppSelector<string>(selectEmail)
  const isAppInitialized = useAppSelector(selectIsAppInitialized)
  const isLoading = useAppSelector(selectIsLoading)

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  const changeName = (title: string) => {
    dispatch(authThunks.changeProfileData({ name: title }))
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
      <div className={s.back}>
        <NavLink to={"/"}>
          <Typography>
            <img src={back} alt="back" />
            <span> Back to Packs List</span>
          </Typography>
        </NavLink>
      </div>
      <div className={s.profile}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>
                <Typography>Personal Information</Typography>
              </div>
              <div className={s.img}>
                <InputTypeFile />
              </div>
              <div className={s.editableSpan}>
                <EditableSpan onChange={changeName} value={name} />
              </div>
              <div className={s.email}>{email}</div>
              <div className={s.logout}>
                {isLoggedIn && (
                  <Button
                    color="primary"
                    variant="text"
                    sx={{ borderRadius: 6 }}
                    onClick={logoutHandler}
                    disabled={isLoading}
                  >
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
