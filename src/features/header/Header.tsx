import React from "react"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { NavLink } from "react-router-dom"
import s from "./Header.module.css"
import { LinearProgress } from "@mui/material"
import { useAppSelector } from "common/hooks"

export const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const name = useAppSelector((state) => (state.auth.profile ? state.auth.profile.name : ""))
  const isLoading = useAppSelector((state) => state.app.isLoading)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              CARDS
            </Typography>
            {isLoggedIn && (
              <div className={s.button}>
                <Button color="primary" variant="outlined" sx={{ borderRadius: 6 }}>
                  <NavLink to="/profile">{name}</NavLink>
                </Button>
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
