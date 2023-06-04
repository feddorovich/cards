import React, { FC, useEffect } from "react"
import s from "./MyPack.module.css"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"
import Button from "@mui/material/Button"
import { NavLink, useSearchParams } from "react-router-dom"
import { Search } from "features/packs/Packs/Search/Search"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import SuperPagination from "features/packs/Packs/Pagination/SuperPagination"
import { cardsThunks } from "features/cards/cards.slice"

export const MyPack: FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  const cards = useAppSelector((state) => state.cards.cards.cards)
  const cardsSettings = useAppSelector((state) => state.cards.cards)
  const packId = document.location.href.split("/")[4].split("?")[0]
  // console.log(packId)

  useEffect(() => {
    if (isLoggedIn) {
      if (packId) {
        dispatch(cardsThunks.getCards({ cardsPack_id: packId, ...params }))
      }
    }
  }, [packId, isLoggedIn, searchParams])

  // Sort by question
  const handleSortQuestionRequest = (): void => {
    if (isLoading) return
    if (params.sortCards === undefined) {
      setSearchParams({ ...params, sortCards: "1question" })
    }
    if (params.sortCards === "0question") {
      delete params.sortCards
      setSearchParams({ ...params })
      return
    }
    if (params.sortCards === "1question") {
      setSearchParams({ ...params, sortCards: "0question" })
    } else {
      setSearchParams({ ...params, sortCards: "1question" })
    }
  }
  // Sort by answer
  const handleSortAnswerRequest = (): void => {
    if (isLoading) return
    if (params.sortCards === undefined) {
      setSearchParams({ ...params, sortCards: "1answer" })
    }
    if (params.sortCards === "0answer") {
      delete params.sortCards
      setSearchParams({ ...params })
      return
    }
    if (params.sortCards === "1answer") {
      setSearchParams({ ...params, sortCards: "0answer" })
    } else {
      setSearchParams({ ...params, sortCards: "1answer" })
    }
  }
  // Sort by updated date
  const handleSortUpdatedDateRequest = (): void => {
    if (isLoading) return
    if (params.sortCards === undefined) {
      setSearchParams({ ...params, sortPacks: "0updated" })
    }
    if (params.sortCards === "0updated") {
      delete params.sortCards
      setSearchParams({ ...params })
      return
    }
    if (params.sortCards === "1updated") {
      setSearchParams({ ...params, sortCards: "0updated" })
    } else {
      setSearchParams({ ...params, sortCards: "1updated" })
    }
  }

  // Debounce & Search
  let timerId: NodeJS.Timeout
  const changeSearchParams = (title: string) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      if (!title) {
        delete params.cardQuestion
        setSearchParams({ ...params })
      } else {
        setSearchParams({ ...params, cardQuestion: title })
      }
    }, 1000)
  }

  // Pagination
  const onChangePagination = (newPage: number, newCount: number) => {
    // console.log("newPage", newPage)
    // console.log("newCount", newCount)
    if (newPage === 1) {
      delete params.page
      setSearchParams({ ...params, pageCount: newCount.toString() })
      if (newCount === 5) {
        delete params.pageCount
        setSearchParams({ ...params })
      }
    } else {
      if (newCount === 5) {
        delete params.pageCount
        setSearchParams({ ...params, page: newPage.toString() })
      } else {
        setSearchParams({ ...params, page: newPage.toString(), pageCount: newCount.toString() })
      }
    }
  }

  return (
    <div className={s.myPack}>
      <div className={s.back}>
        <NavLink to={"/"}>← Back to Packs List</NavLink>
      </div>
      <div className={s.header}>
        <div className={s.packsList}>My Pack</div>
        <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6 }}>
          Add new card
        </Button>
      </div>
      <div className={s.settings}>
        <div className={s.search}>
          <div>Search</div>
          <Search onChange={changeSearchParams} value={params.packName || ""} />
        </div>
        <div className={s.filter}>
          <div>Filter</div>
          <Button
            variant={"contained"}
            color={"inherit"}
            onClick={() => setSearchParams({})}
            sx={{ padding: 0, minWidth: 0, height: "100%" }}
          >
            <FilterAltOffIcon />
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" onClick={handleSortQuestionRequest}>
                <TableSortLabel
                  active={params.sortCards === "0question" || params.sortCards === "1question"}
                  direction={params.sortCards === "1question" || "" ? "asc" : "desc"}
                >
                  Question
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortAnswerRequest}>
                <TableSortLabel
                  active={params.sortCards === "0answer" || params.sortCards === "1answer"}
                  direction={params.sortCards === "0answer" || "" ? "asc" : "desc"}
                >
                  Answer
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortUpdatedDateRequest}>
                <TableSortLabel
                  active={params.sortCards === "0updated" || params.sortCards === "1updated"}
                  direction={params.sortCards === "0updated" || "" ? "asc" : "desc"}
                >
                  Last Updated
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Grade</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards &&
              cards.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row" align="center">
                    {row.question}
                  </TableCell>
                  <TableCell align="center">{row.answer}</TableCell>
                  <TableCell align="center">{row.updated}</TableCell>
                  <TableCell align="center">{row.rating}</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {cards && cards.length === 0 && (
        <div className={s.noPacks}>Unfortunately, we couldn't find any results based on your specified parameters.</div>
      )}
      {Object.keys(cardsSettings).length && (
        <div className={s.pagination}>
          <SuperPagination
            page={+params.page || cardsSettings.page}
            itemsCountForPage={+params.pageCount || cardsSettings.pageCount}
            totalCount={cardsSettings.cardsTotalCount}
            onChange={onChangePagination}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  )
}
