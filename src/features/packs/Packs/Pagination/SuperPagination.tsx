import React, { ChangeEvent } from "react"
import { Pagination } from "@mui/material"
import s from "./SuperPagination.module.css"
import SuperSelect from "features/packs/Packs/Pagination/Select/SuperSelect"

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  id = "hw15",
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
        id={id + "-pagination"}
        sx={
          {
            // стили для Pagination // пишет студент
          }
        }
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
        color={"primary"}
      />

      <span className={s.text1}>Показать</span>

      <SuperSelect
        id={id + "-pagination-select"}
        value={itemsCountForPage}
        options={[
          { id: 5, value: 5 },
          { id: 10, value: 10 },
          { id: 20, value: 20 },
        ]}
        onChange={onChangeSelect}
      />

      <span className={s.text2}>строк в таблице</span>
    </div>
  )
}

export default SuperPagination
