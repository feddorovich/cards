import React, { FC, useEffect, useState } from "react"
import s from "./Packs.module.css"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { useNavigate, useSearchParams } from "react-router-dom"
import { packsThunks } from "features/packs/packs.slice"
import TableSortLabel from "@mui/material/TableSortLabel"
import TableRow from "@mui/material/TableRow"
import TableHead from "@mui/material/TableHead"
import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import Table from "@mui/material/Table"
import Paper from "@mui/material/Paper"
import IconButton from "@mui/material/IconButton"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import SchoolIcon from "@mui/icons-material/School"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Search } from "features/packs/Packs/Search/Search"
import { CustomSlider } from "features/packs/Packs/CustomSlider/CustomSlider"
import SuperPagination from "features/packs/Packs/Pagination/SuperPagination"
import { cardsActions } from "features/cards/cards.slice"
import { appActions } from "app/app.slice"
import {
  selectCardPacks,
  selectCardPacksSettings,
  selectMaxCardsCount,
  selectMinCardsCount,
} from "features/packs/packs.selector"
import { selectId, selectIsLoggedIn } from "features/auth/auth.selector"
import { selectIsLoading } from "app/app.selector"
import { AddNewPackModal } from "features/modal/AddNewPackModal/AddNewPackModal"
import { EditPackModal } from "features/modal/EditPackModal/EditPackModal"
import { DeletePackModal } from "features/modal/DeletePackModal/DeletePackModal"
import { formatDate } from "common/utils"
import { SliderInput } from "features/packs/Packs/CustomSlider/SliderInput"

export const Packs: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  const cardPacks = useAppSelector(selectCardPacks)
  const cardPacksSettings = useAppSelector(selectCardPacksSettings)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isLoading = useAppSelector(selectIsLoading)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const id = useAppSelector(selectId)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(packsThunks.getPacks(params))
      dispatch(cardsActions.setEmptyCards())
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
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>()
  const changeSearchParams = (title: string) => {
    clearTimeout(timerId)

    setTimerId(
      setTimeout(() => {
        if (!title) {
          delete params.packName
          setSearchParams({ ...params })
        } else {
          setSearchParams({ ...params, packName: title })
        }
      }, 1000)
    )
  }

  // Button switcher
  const switchMyCardHandler = () => {
    setSearchParams({ ...params, user_id: id })
  }
  const switchAllCardHandler = () => {
    delete params.user_id
    setSearchParams({ ...params })
  }

  // Pagination
  const onChangePagination = (newPage: number, newCount: number) => {
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

  //Slider
  useEffect(() => {
    if (minCardsCount !== undefined && maxCardsCount !== undefined) {
      setValue1(+params.min || minCardsCount)
      setValue2(+params.max || maxCardsCount)
    }
  }, [minCardsCount, maxCardsCount])
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(110)
  const onChangeSliderHandler = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
      setValue1(value[0])
      setValue2(value[1])
      if (value[1] === maxCardsCount && value[0] === minCardsCount) {
        delete params.max
        delete params.min
        setSearchParams({ ...params })
      } else {
        if (value[1] !== maxCardsCount && value[0] === minCardsCount) {
          delete params.min
          setSearchParams({ ...params, max: value[1].toString() })
        } else if (value[1] === maxCardsCount && value[0] !== minCardsCount) {
          delete params.max
          setSearchParams({ ...params, min: value[0].toString() })
        } else {
          setSearchParams({ ...params, min: value[0].toString(), max: value[1].toString() })
        }
      }
    } else {
      setValue1(value)
    }
  }
  const onChangeSliderInputHandler1 = (value: number) => {
    if (value < minCardsCount || value > maxCardsCount) {
      dispatch(appActions.setError({ error: "Incorrect value" }))
      return
    }
    setValue1(value)
    clearTimeout(timerId)
    setTimerId(
      setTimeout(() => {
        if (value === minCardsCount) {
          delete params.min
          setSearchParams({ ...params })
        } else {
          setSearchParams({ ...params, min: value.toString() })
        }
      }, 1000)
    )
  }
  const onChangeSliderInputHandler2 = (value: number) => {
    if (value < minCardsCount || value > maxCardsCount) {
      dispatch(appActions.setError({ error: "Incorrect value" }))
      return
    }
    setValue2(value)
    clearTimeout(timerId)
    setTimerId(
      setTimeout(() => {
        if (value === maxCardsCount) {
          delete params.max
          setSearchParams({ ...params })
        } else {
          setSearchParams({ ...params, max: value.toString() })
        }
      }, 1000)
    )
  }

  return (
    <div>
      <div className={s.header}>
        <div className={s.packsList}>Packs list</div>
        <AddNewPackModal>
          <Button type={"submit"} variant="contained" color={"primary"} sx={{ borderRadius: 6 }} disabled={isLoading}>
            Add new pack
          </Button>
        </AddNewPackModal>
      </div>
      <div className={s.settings}>
        <div className={s.search}>
          <div>Search</div>
          <Search onChange={changeSearchParams} value={params.packName || ""} />
        </div>
        <div className={s.show}>
          <div>Show packs cards</div>
          <ButtonGroup>
            <Button
              variant={params.user_id === id ? "contained" : "outlined"}
              onClick={switchMyCardHandler}
              disabled={isLoading}
            >
              My
            </Button>
            <Button
              variant={params.user_id !== id ? "contained" : "outlined"}
              onClick={switchAllCardHandler}
              disabled={isLoading}
            >
              All
            </Button>
          </ButtonGroup>
        </div>
        <div className={s.numbers}>
          <div>Number of cards</div>
          <div className={s.slider}>
            <SliderInput value={value1} onChange={onChangeSliderInputHandler1} disable={isLoading} />
            <CustomSlider
              value={[value1, value2]}
              min={minCardsCount}
              max={maxCardsCount}
              disabled={isLoading}
              onChangeCommitted={onChangeSliderHandler}
            />
            <SliderInput value={value2} onChange={onChangeSliderInputHandler2} disable={isLoading} />
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
            <TableRow hover={true}>
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
              cardPacks.map((row) => {
                if (row.cardsCount === 0 && id !== row.user_id) {
                  return (
                    <TableRow
                      key={row._id}
                      onClick={() => {
                        dispatch(appActions.setError({ error: "No cards to study" }))
                      }}
                      className={s.tableRowDisabled}
                    >
                      <TableCell component="th" scope="row" align="center" sx={{ padding: "8px 16px" }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px 16px" }}>
                        {row.cardsCount}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px 16px" }}>
                        {formatDate(row.updated)}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px 16px" }}>
                        {row.user_name}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px 16px" }}>
                        <IconButton aria-label="learn">
                          <SchoolIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                } else {
                  return (
                    <TableRow
                      hover={true}
                      key={row._id}
                      onClick={() => {
                        navigate(id === row.user_id ? `/my-pack/${row._id}` : `/friends-pack/${row._id}`)
                      }}
                      className={s.tableRowActive}
                    >
                      <TableCell component="th" scope="row" align="center" sx={{ padding: "8px 16px" }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px 16px" }}>
                        {row.cardsCount}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px 16px" }}>
                        {formatDate(row.updated)}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px 16px" }}>
                        {row.user_name}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ padding: "8px 16px" }}
                        onClick={(event) => {
                          event.stopPropagation()
                        }}
                      >
                        {row.user_id === id && (
                          <div>
                            <IconButton
                              aria-label="learn"
                              onClick={() => {
                                navigate(`/learn/${row._id}`)
                              }}
                            >
                              <div>
                                <SchoolIcon />
                              </div>
                            </IconButton>
                            <IconButton aria-label="edit" disabled={isLoading}>
                              <EditPackModal _id={row._id}>
                                <EditIcon />
                              </EditPackModal>
                            </IconButton>
                            <IconButton aria-label="delete" disabled={isLoading}>
                              <DeletePackModal _id={row._id}>
                                <DeleteIcon />
                              </DeletePackModal>
                            </IconButton>
                          </div>
                        )}
                        {row.user_id !== id && (
                          <div>
                            <IconButton
                              aria-label="learn"
                              onClick={() => {
                                navigate(`/learn/${row._id}`)
                              }}
                            >
                              <SchoolIcon />
                            </IconButton>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                }
              })}
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
