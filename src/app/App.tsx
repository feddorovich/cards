import React from "react"
import "app/App.css"
import { useAppSelector } from "app/hooks"
import { CircularProgress } from "@mui/material"
import { Navigate } from "react-router-dom"

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)

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
    <div style={{ margin: "50px" }}>
      <div>APP</div>
    </div>
  )
}

export default App
