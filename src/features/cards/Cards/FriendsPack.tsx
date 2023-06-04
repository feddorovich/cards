import React, { FC, useEffect } from "react"
import s from "features/cards/Cards/FriendsPack.module.css"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"
import Button from "@mui/material/Button"
import { NavLink, useSearchParams } from "react-router-dom"
import { Search } from "features/packs/Packs/Search/Search"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import SuperPagination from "features/packs/Packs/Pagination/SuperPagination"
import { cardsThunks } from "features/cards/Cards/cards.slice"

export const FriendsPack: FC = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector((state) => state.packs.cardPacks.cardPacks)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const id = useAppSelector((state) => (state.auth.profile ? state.auth.profile._id : ""))
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  const cardPacksSettings = useAppSelector((state) => state.packs.cardPacks)
  const cards = useAppSelector((state) => state.cards.cards.cards)
  const packId = document.location.href.split("/").pop()
  console.log(packId)

  useEffect(() => {
    if (packId) {
      dispatch(cardsThunks.getCards({ cardsPack_id: packId }))
    }
  }, [packId])

  // Sort by name
  const handleSortNameRequest = (): void => {
    if (params.sortPacks === undefined) {
      setSearchParams({ ...params, sortPacks: "1name" })
    }
    if (params.sortPacks === "0name") {
      delete params.sortPacks
      setSearchParams({ ...params })
    }
    if (params.sortPacks === "1name") {
      setSearchParams({ ...params, sortPacks: "0name" })
    } else {
      setSearchParams({ ...params, sortPacks: "1name" })
    }
  }
  // Sort by cardsCount
  const handleSortCardsRequest = (): void => {
    if (params.sortPacks === undefined) {
      setSearchParams({ ...params, sortPacks: "0cardsCount" })
    }
    if (params.sortPacks === "0cardsCount") {
      delete params.sortPacks
      setSearchParams({ ...params })
    }
    if (params.sortPacks === "1cardsCount") {
      setSearchParams({ ...params, sortPacks: "0cardsCount" })
    } else {
      setSearchParams({ ...params, sortPacks: "1cardsCount" })
    }
  }
  // Sort by updated date
  const handleSortUpdatedDateRequest = (): void => {
    if (params.sortPacks === undefined) {
      setSearchParams({ ...params, sortPacks: "0updated" })
    }
    if (params.sortPacks === "0updated") {
      delete params.sortPacks
      setSearchParams({ ...params })
    }
    if (params.sortPacks === "1updated") {
      setSearchParams({ ...params, sortPacks: "0updated" })
    } else {
      setSearchParams({ ...params, sortPacks: "1updated" })
    }
  }
  // Sort by user_name
  const handleSortUserNameRequest = (): void => {
    if (params.sortPacks === undefined) {
      setSearchParams({ ...params, sortPacks: "1user_name" })
    }
    if (params.sortPacks === "0user_name") {
      delete params.sortPacks
      setSearchParams({ ...params })
    }
    if (params.sortPacks === "1user_name") {
      setSearchParams({ ...params, sortPacks: "0user_name" })
    } else {
      setSearchParams({ ...params, sortPacks: "1user_name" })
    }
  }

  // Debounce & Search
  let timerId: NodeJS.Timeout
  const changeSearchParams = (title: string) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      if (!title) {
        delete params.packName
        setSearchParams({ ...params })
      } else {
        setSearchParams({ ...params, packName: title })
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
      if (newCount === 10) {
        delete params.pageCount
        setSearchParams({ ...params })
      }
    } else {
      if (newCount === 10) {
        delete params.pageCount
        setSearchParams({ ...params, page: newPage.toString() })
      } else {
        setSearchParams({ ...params, page: newPage.toString(), pageCount: newCount.toString() })
      }
    }
  }

  return (
    <div className={s.friendsPacks}>
      <div className={s.back}>
        <NavLink to={"/"}>← Back to Packs List</NavLink>
      </div>
      <div className={s.header}>
        <div className={s.packsList}>Friend’s Pack</div>
        <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6 }}>
          Learn to pack
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
              <TableCell align="center" onClick={handleSortNameRequest}>
                <TableSortLabel
                  active={params.sortPacks === "0name" || params.sortPacks === "1name"}
                  direction={params.sortPacks === "1name" || "" ? "asc" : "desc"}
                >
                  Question
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortCardsRequest}>
                <TableSortLabel
                  active={params.sortPacks === "0cardsCount" || params.sortPacks === "1cardsCount"}
                  direction={params.sortPacks === "0cardsCount" || "" ? "asc" : "desc"}
                >
                  Answer
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortUpdatedDateRequest}>
                <TableSortLabel
                  active={params.sortPacks === "0updated" || params.sortPacks === "1updated"}
                  direction={params.sortPacks === "0updated" || "" ? "asc" : "desc"}
                >
                  Last Updated
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortUserNameRequest}>
                <TableSortLabel
                  active={params.sortPacks === "0user_name" || params.sortPacks === "1user_name"}
                  direction={params.sortPacks === "1user_name" || "" ? "asc" : "desc"}
                >
                  Grade
                </TableSortLabel>
              </TableCell>
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {cardPacks && cardPacks.length === 0 && (
        <div className={s.noPacks}>Unfortunately, we couldn't find any results based on your specified parameters.</div>
      )}
      {Object.keys(cardPacksSettings).length && (
        <div className={s.pagination}>
          <SuperPagination
            page={+params.page || cardPacksSettings.page}
            itemsCountForPage={+params.pageCount || cardPacksSettings.pageCount}
            totalCount={cardPacksSettings.cardPacksTotalCount}
            onChange={onChangePagination}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  )
}
