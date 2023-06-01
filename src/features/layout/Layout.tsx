import React, { FC, ReactNode, useEffect } from "react"
import { Header } from "features/header/Header"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { appThunks } from "app/app.slice"
import s from "./Layout.module.css"
import { authActions } from "features/auth/auth.slice"

type LayoutPropsType = {
  children: ReactNode
}

export const Layout: FC<LayoutPropsType> = ({ children }) => {
  const redirectPath = useAppSelector((state) => state.auth.redirectPath)
  const dispatch = useAppDispatch()
  console.log(redirectPath)

  useEffect(() => {
    dispatch(appThunks.initialize())
  }, [])

  useEffect(() => {
    if (redirectPath !== "") {
      dispatch(authActions.setRedirectPath({ redirectPath: "" }))
    }
  }, [redirectPath])

  return (
    <div className={s.container}>
      <Header />
      {children}
    </div>
  )
}
