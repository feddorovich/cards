import React, { FC, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"

export const Packs: FC = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector((state) => state.packs.cardPacks.cardPacks)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  // console.log(cardPacks)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(packsThunks.getPacks())
    }
  }, [isLoggedIn])

  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc")

  const handleSortRequest = (): void => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc")
  }

  return (
    <div>
      <div>Packs</div>
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
