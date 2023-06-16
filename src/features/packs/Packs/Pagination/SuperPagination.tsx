import React, { ChangeEvent } from "react"
import { Pagination } from "@mui/material"
import s from "./SuperPagination.module.css"
import SuperSelect from "features/packs/Packs/Pagination/Select/SuperSelect"
import Typography from "@mui/material/Typography"

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  isLoading: boolean
  onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  isLoading,
}) => {
  const lastPage = Math.ceil(totalCount / itemsCountForPage) // пишет студент // вычислить количество страниц

  const onChangeCallback = (event: React.ChangeEvent<unknown>, page: number) => {
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(page, +event.currentTarget.value)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        // hideNextButton
        // hidePrevButton
        disabled={isLoading}
        color={"primary"}
      />

      <Typography variant={"body2"}>show</Typography>

      <SuperSelect
        value={itemsCountForPage}
        options={[
          { id: 5, value: 5 },
          { id: 10, value: 10 },
          { id: 20, value: 20 },
        ]}
        isLoading={isLoading}
        onChange={onChangeSelect}
      />

      <Typography variant={"body2"}>cards per page</Typography>
    </div>
  )
}

export default SuperPagination
