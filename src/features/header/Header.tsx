import React from "react"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useAppSelector } from "app/hooks"
import { Link } from "react-router-dom"

export const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const name = useAppSelector((state) => state.auth.profile?.name)
  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()
  //   window.location.href = "/profile"
  // }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              CARDS
            </Typography>
            {isLoggedIn && (
              <Button color="primary" variant="outlined" sx={{ borderRadius: 6 }}>
                {name}
              </Button>
              // <Link to="/register">Sing Up</Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
