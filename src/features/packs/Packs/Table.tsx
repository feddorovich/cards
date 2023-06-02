import React, { useState } from "react"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"

interface RowData {
  number: number
  item: string
  qty: number
  price: number
}

function createData(number: number, item: string, qty: number, price: number): RowData {
  return { number, item, qty, price }
}

const rows: RowData[] = [
  createData(1, "Apple", 5, 3),
  createData(2, "Orange", 2, 2),
  createData(3, "Grapes", 3, 1),
  createData(4, "Tomato", 2, 1.6),
  createData(5, "Mango", 1.5, 4),
]

export default function SortedTable(): JSX.Element {
  const [rowData, setRowData] = useState<RowData[]>(rows)
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc")

  const sortArray = (arr: RowData[], orderBy: "asc" | "desc"): RowData[] => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0))
      case "desc":
        return arr.sort((a, b) => (a.price < b.price ? 1 : b.price < a.price ? -1 : 0))
    }
  }

  const handleSortRequest = (): void => {
    setRowData(sortArray(rows, orderDirection))
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc")
  }

  return (
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
          {rowData.map((row) => (
            <TableRow key={row.number}>
              <TableCell component="th" scope="row" align="center">
                {row.number}
              </TableCell>
              <TableCell align="center">{row.item}</TableCell>
              <TableCell align="center">{row.qty}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
