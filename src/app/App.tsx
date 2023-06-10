import React from "react"
import "app/App.css"
import { CircularProgress } from "@mui/material"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "common/hooks"
import { Packs } from "features/packs/Packs/Packs"
import { selectIsAppInitialized } from "app/app.selector"
import { selectIsLoggedIn } from "features/auth/auth.selector"

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isAppInitialized = useAppSelector(selectIsAppInitialized)

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
    <div style={{ margin: "50px 50px 0" }}>
      <Packs />
    </div>
  )
}

export default App
