import React from "react"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export const Header = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              CARDS
            </Typography>
            <Button color="primary" variant="outlined" sx={{ borderRadius: 6 }}>
              Sign in
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
