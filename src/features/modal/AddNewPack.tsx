import React, { FC, ReactNode } from "react"
import { BasicModal } from "features/modal/BasicModal"

type AddNewPackPropsType = {
  children: ReactNode
}

export const AddNewPack: FC<AddNewPackPropsType> = ({ children }) => {
  return (
    <div>
      <BasicModal title={"Add new pack"} childrenOpen={<div>{children}</div>}>
        <button>add</button>
      </BasicModal>
    </div>
  )
}
