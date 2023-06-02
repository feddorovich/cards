import React, { FC, useEffect, useState } from "react"
import s from "./Packs.module.css"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"
import Button from "@mui/material/Button"
import { useSearchParams } from "react-router-dom"
import { Search } from "features/packs/Packs/Search/Search"

export const Packs: FC = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector((state) => state.packs.cardPacks.cardPacks)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const [searchParams, setSearchParams] = useSearchParams()
  // console.log(Object.fromEntries(searchParams))

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(packsThunks.getPacks({}))
    }
  }, [isLoggedIn])

  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc")

  const handleSortRequest = (): void => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc")
  }

  // Debounce
  let timerId: NodeJS.Timeout
  const changeSearchParams = (title: string) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      if (!title) {
        setSearchParams({})
        dispatch(packsThunks.getPacks({ packName: title }))
      } else {
        setSearchParams({ find: title })
        dispatch(packsThunks.getPacks({ packName: title }))
      }
    }, 1000)
  }

  return (
    <div>
      <div className={s.header}>
        <div className={s.packsList}>Packs list</div>
        <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6 }}>
          Add new pack
        </Button>
      </div>
      <div className={s.settings}>
        <div className={s.search}>
          <div>Search</div>
          <Search onChange={changeSearchParams} value={""} />
        </div>
        <div className={s.show}>Show packs cards</div>
        <div className={s.numbers}>Number of cards</div>
        <div className={s.filter}>Filter</div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" onClick={handleSortRequest}>
                <TableSortLabel active={true} direction={orderDirection}>
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortRequest}>
                <TableSortLabel active={true} direction={orderDirection}>
                  Cards
                </TableSortLabel>
              </TableCell>

              <TableCell align="center" onClick={handleSortRequest}>
                <TableSortLabel active={true} direction={orderDirection}>
                  Last Updated
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortRequest}>
                <TableSortLabel active={true} direction={orderDirection}>
                  Created by
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardPacks &&
              cardPacks.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.cardsCount}</TableCell>
                  <TableCell align="center">{row.updated}</TableCell>
                  <TableCell align="center">{row.created}</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
