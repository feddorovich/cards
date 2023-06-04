import React, { FC, useEffect, useState } from "react"
import s from "./Packs.module.css"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import {
  ButtonGroup,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material"
import Button from "@mui/material/Button"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Search } from "features/packs/Packs/Search/Search"
import { CustomSlider } from "features/packs/Packs/CustomSlider/CustomSlider"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import SuperPagination from "features/packs/Packs/Pagination/SuperPagination"
import SchoolIcon from "@mui/icons-material/School"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

export const Packs: FC = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector((state) => state.packs.cardPacks.cardPacks)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const id = useAppSelector((state) => (state.auth.profile ? state.auth.profile._id : ""))
  const minCardsCount = useAppSelector((state) => state.packs.cardPacks.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.cardPacks.maxCardsCount)
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  const cardPacksSettings = useAppSelector((state) => state.packs.cardPacks)
  const navigate = useNavigate()
  console.log(id)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(packsThunks.getPacks(params))
    }
  }, [isLoggedIn, searchParams])

  // Sort by name
  const handleSortNameRequest = (): void => {
    if (isLoading) return
    if (params.sortPacks === undefined) {
      setSearchParams({ ...params, sortPacks: "1name" })
    }
    if (params.sortPacks === "0name") {
      delete params.sortPacks
      setSearchParams({ ...params })
      return
    }
    if (params.sortPacks === "1name") {
      setSearchParams({ ...params, sortPacks: "0name" })
    } else {
      setSearchParams({ ...params, sortPacks: "1name" })
    }
  }
  // Sort by cardsCount
  const handleSortCardsRequest = (): void => {
    if (isLoading) return
    if (params.sortPacks === undefined) {
      setSearchParams({ ...params, sortPacks: "0cardsCount" })
    }
    if (params.sortPacks === "0cardsCount") {
      delete params.sortPacks
      setSearchParams({ ...params })
      return
    }
    if (params.sortPacks === "1cardsCount") {
      setSearchParams({ ...params, sortPacks: "0cardsCount" })
    } else {
      setSearchParams({ ...params, sortPacks: "1cardsCount" })
    }
  }
  // Sort by updated date
  const handleSortUpdatedDateRequest = (): void => {
    if (isLoading) return
    if (params.sortPacks === undefined) {
      setSearchParams({ ...params, sortPacks: "0updated" })
    }
    if (params.sortPacks === "0updated") {
      delete params.sortPacks
      setSearchParams({ ...params })
      return
    }
    if (params.sortPacks === "1updated") {
      setSearchParams({ ...params, sortPacks: "0updated" })
    } else {
      setSearchParams({ ...params, sortPacks: "1updated" })
    }
  }
  // Sort by user_name
  const handleSortUserNameRequest = (): void => {
    if (isLoading) return
    if (params.sortPacks === undefined) {
      setSearchParams({ ...params, sortPacks: "1user_name" })
    }
    if (params.sortPacks === "0user_name") {
      delete params.sortPacks
      setSearchParams({ ...params })
      return
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

  // Button switcher
  const switchMyCardHandler = () => {
    setSearchParams({ ...params, user_id: id })
  }
  const switchAllCardHandler = () => {
    delete params.user_id
    setSearchParams({ ...params })
  }

  //Slider
  useEffect(() => {
    if (minCardsCount !== undefined && maxCardsCount !== undefined) {
      setValue1(minCardsCount)
      setValue2(maxCardsCount)
    }
  }, [minCardsCount, maxCardsCount])

  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(100)

  // useEffect(() => {
  //   clearTimeout(timerId)
  //   timerId = setTimeout(() => {
  //     if (value1) {
  //       setSearchParams({ ...params, min: value1.toString() })
  //     }
  //     if (value1 === minCardsCount) {
  //       delete params.min
  //       setSearchParams({ ...params })
  //     }
  //   }, 1000)
  // }, [value1])
  //
  // useEffect(() => {
  //   clearTimeout(timerId)
  //   timerId = setTimeout(() => {
  //     if (value2) {
  //       setSearchParams({ ...params, max: value2.toString() })
  //     }
  //     if (value2 === maxCardsCount) {
  //       delete params.max
  //       setSearchParams({ ...params })
  //     }
  //   }, 1000)
  // }, [value2])

  const onChangeSliderHandler = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue1(value[0])
      setValue2(value[1])
    } else {
      setValue1(value)
    }
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

  // addPack
  const addPackHandler = async () => {
    await dispatch(packsThunks.addPack())
    dispatch(packsThunks.getPacks(params))
  }

  const deletePackHandler = async (id: string) => {
    await dispatch(packsThunks.deletePack(id))
    dispatch(packsThunks.getPacks(params))
  }
  const editPackHandler = async (id: string) => {
    await dispatch(packsThunks.editPack(id))
    dispatch(packsThunks.getPacks(params))
  }

  return (
    <div>
      <div className={s.header}>
        <div className={s.packsList}>Packs list</div>
        <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6 }} onClick={addPackHandler}>
          Add new pack
        </Button>
      </div>
      <div className={s.settings}>
        <div className={s.search}>
          <div>Search</div>
          <Search onChange={changeSearchParams} value={params.packName || ""} />
        </div>
        <div className={s.show}>
          <div>Show packs cards</div>
          <ButtonGroup>
            <Button variant={params.user_id === id ? "contained" : "outlined"} onClick={switchMyCardHandler}>
              My
            </Button>
            <Button variant={params.user_id !== id ? "contained" : "outlined"} onClick={switchAllCardHandler}>
              All
            </Button>
          </ButtonGroup>
        </div>
        <div className={s.numbers}>
          <div>Number of cards</div>
          <div>
            <CustomSlider value={[value1, value2]} onChange={onChangeSliderHandler} />
          </div>
        </div>
        <div className={s.filter}>
          <div>Reset</div>
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
          <TableHead className={s.tableHead}>
            <TableRow>
              <TableCell align="center" onClick={handleSortNameRequest}>
                <TableSortLabel
                  active={params.sortPacks === "0name" || params.sortPacks === "1name"}
                  direction={params.sortPacks === "1name" || "" ? "asc" : "desc"}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortCardsRequest}>
                <TableSortLabel
                  active={params.sortPacks === "0cardsCount" || params.sortPacks === "1cardsCount"}
                  direction={params.sortPacks === "0cardsCount" || "" ? "asc" : "desc"}
                >
                  Cards
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
                  Created by
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardPacks &&
              cardPacks.map((row) => (
                <TableRow
                  key={row._id}
                  onClick={() => navigate(id === row.user_id ? `/my-pack/${row._id}` : `/friends-pack/${row._id}`)}
                  className={s.tableRow}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.cardsCount}</TableCell>
                  <TableCell align="center">{row.updated}</TableCell>
                  <TableCell align="center">{row.user_name}</TableCell>
                  <TableCell
                    align="center"
                    onClick={(event) => {
                      event.stopPropagation()
                    }}
                  >
                    {row.user_id === id && (
                      <div>
                        <IconButton aria-label="learn">
                          <SchoolIcon />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => editPackHandler(row._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => deletePackHandler(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )}
                    {row.user_id !== id && (
                      <div>
                        <IconButton aria-label="learn">
                          <SchoolIcon />
                        </IconButton>
                      </div>
                    )}
                  </TableCell>
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
