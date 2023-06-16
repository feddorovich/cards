import React, { FC } from "react"
import { CircularProgress, Grid, Paper } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./Profile.module.css"
import { Navigate, NavLink } from "react-router-dom"
import checkEmail from "assets/image/checkEmail.png"
import { authThunks } from "features/auth/auth.slice"
import { EditableSpan } from "features/profile/editableSpan/EditableSpan"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { InputTypeFile } from "features/profile/InputTypeProfile/InputTypeProfile"

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  // const avatar = useAppSelector((state) => state.auth.profile?.avatar)
  const name = useAppSelector<string>((state) => (state.auth.profile ? state.auth.profile.name : ""))
  const email = useAppSelector<string>((state) => (state.auth.profile ? state.auth.profile.email : ""))
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  const changeName = (title: string) => {
    dispatch(authThunks.changeProfileName(title))
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
        <NavLink to={"/"}>← Back to Packs List</NavLink>
      </div>
      <div className={s.profile}>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Paper className={s.paper}>
              <div className={s.header}>Personal Information</div>
              <div className={s.img}>
                <InputTypeFile />
                {/*<img src={checkEmail} alt="email image" />*/}
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
