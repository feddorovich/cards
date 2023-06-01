import React, { FC, ReactNode, useEffect } from "react"
import { Header } from "features/header/Header"
import { appThunks } from "app/app.slice"
import s from "./Layout.module.css"
import { authActions } from "features/auth/auth.slice"
import { useAppDispatch, useAppSelector } from "common/hooks"

type LayoutPropsType = {
  children: ReactNode
}

export const Layout: FC<LayoutPropsType> = ({ children }) => {
  const redirectPath = useAppSelector((state) => state.auth.redirectPath)
  const dispatch = useAppDispatch()

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
