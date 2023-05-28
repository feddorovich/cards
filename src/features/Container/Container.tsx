import React, { FC, ReactNode, useEffect } from "react"
import style from "./Container.module.css"
import { useAppDispatch } from "app/hooks"
import { appThunks } from "app/app.slice"

type ContainerType = {
  children: ReactNode
}

export const Container: FC<ContainerType> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(appThunks.initialize())
  }, [])

  return (
    <div className={style.container}>
      <div>{children}</div>
    </div>
  )
}
