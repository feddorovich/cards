import React from "react"
import "app/App.css"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { CircularProgress } from "@mui/material"
import { Navigate } from "react-router-dom"
import Button from "@mui/material/Button"
import { authThunks } from "features/auth/auth.slice"

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)

  const dispatch = useAppDispatch()

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

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  return (
    <div>
      <div>APP</div>
      {isLoggedIn && (
        <Button color="primary" variant="outlined" sx={{ borderRadius: 6 }} onClick={logoutHandler}>
          Log Out
        </Button>
      )}
    </div>
  )
}

export default App
