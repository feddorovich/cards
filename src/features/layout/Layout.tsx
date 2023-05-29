import React, { FC, ReactNode, useEffect } from "react"
import { Header } from "features/header/Header"
import { useAppDispatch } from "app/hooks"
import { appThunks } from "app/app.slice"
import style from "./Layout.module.css"

type LayoutPropsType = {
  children: ReactNode
}

export const Layout: FC<LayoutPropsType> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(appThunks.initialize())
  }, [])

  return (
    <div className={style.container}>
      <Header />
      {children}
    </div>
  )
}