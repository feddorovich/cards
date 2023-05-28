import React, { useEffect } from "react"
import "app/App.css"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { CircularProgress } from "@mui/material"
import { appThunks } from "app/app.slice"

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized)

  console.log(isLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(appThunks.initialize())
  }, [])

  if (!isAppInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <div>APP</div>
    </div>
  )
}

export default App
