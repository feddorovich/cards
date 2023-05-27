import React, { FC, ReactNode } from 'react'
import style from './Container.module.css'

type ContainerType = {
  children: ReactNode
}

export const Container: FC<ContainerType> = ({ children }) => {
  return (
    <div className={style.container}>
      <div>{children}</div>
    </div>
  )
}
