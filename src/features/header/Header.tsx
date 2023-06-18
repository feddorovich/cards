import React from "react"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { NavLink, useNavigate } from "react-router-dom"
import s from "./Header.module.css"
import { LinearProgress } from "@mui/material"
import { useAppSelector } from "common/hooks"
import { selectAvatar, selectIsLoggedIn, selectName } from "features/auth/auth.selector"
import { selectIsLoading } from "app/app.selector"
import AccountMenu from "features/header/PositionedMenu"

export const Header = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const name = useAppSelector<string>(selectName)
  const isLoading = useAppSelector(selectIsLoading)
  const avatar = useAppSelector(selectAvatar)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className={s.header}>
              CARDS
            </Typography>
            {isLoggedIn && (
              <div className={s.headerMenu}>
                <AccountMenu />
              </div>
            )}
          </Toolbar>
          <div className={s.linearProgressWrapper}>
            {isLoading && <LinearProgress color="primary" className={s.linearProgress} />}
          </div>
        </AppBar>
      </Box>
    </div>
  )
}
