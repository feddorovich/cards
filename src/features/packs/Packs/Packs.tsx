import React, { FC, useEffect, useState } from "react"
import s from "./Packs.module.css"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { packsThunks } from "features/packs/packs.slice"
import {
  ButtonGroup,
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
import { useSearchParams } from "react-router-dom"
import { Search } from "features/packs/Packs/Search/Search"
import { CustomSlider } from "features/packs/Packs/CustomSlider/CustomSlider"

export const Packs: FC = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector((state) => state.packs.cardPacks.cardPacks)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const id = useAppSelector((state) => (state.auth.profile ? state.auth.profile._id : ""))
  const minCardsCount = useAppSelector((state) => state.packs.cardPacks.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.cardPacks.maxCardsCount)
  const [searchParams, setSearchParams] = useSearchParams({ packName: "", user_id: "" })

  useEffect(() => {
    if (isLoggedIn) {
      const params = Object.fromEntries(searchParams)
      console.log(Object.fromEntries(searchParams))
      dispatch(packsThunks.getPacks(params))
    }
  }, [isLoggedIn, searchParams])

  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc")

  const handleSortRequest = (): void => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc")
  }

  // Debounce & Search
  let timerId: NodeJS.Timeout
  const changeSearchParams = (title: string) => {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      if (!title) {
        setSearchParams({ ...searchParams })
        // dispatch(packsThunks.getPacks({ packName: title }))
      } else {
        setSearchParams({ ...searchParams, packName: title })
        // dispatch(packsThunks.getPacks({ packName: title }))
      }
    }, 1000)
  }

  // Button switcher
  const [isAllCardSwitch, setIsAllCardSwitch] = useState(false)
  const switchMyCardHandler = () => {
    setSearchParams({ ...searchParams, user_id: id })
    // dispatch(packsThunks.getPacks({ user_id: id }))
    setIsAllCardSwitch(true)
  }
  const switchAllCardHandler = () => {
    setSearchParams({ ...searchParams })
    // dispatch(packsThunks.getPacks({}))
    setIsAllCardSwitch(false)
  }

  //Slider
  useEffect(() => {
    if (minCardsCount !== undefined && maxCardsCount !== undefined) {
      setValue1(minCardsCount)
      setValue2(maxCardsCount)
    }
  }, [minCardsCount, maxCardsCount])

  const [value1, setValue1] = useState(minCardsCount)
  const [value2, setValue2] = useState(maxCardsCount)

  const onChangeSliderHandler = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue1(value[0])
      setValue2(value[1])
    } else {
      setValue1(value)
    }
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
          <Search onChange={changeSearchParams} />
        </div>
        <div className={s.show}>
          <div>Show packs cards</div>
          <ButtonGroup>
            <Button variant={isAllCardSwitch ? "contained" : "outlined"} onClick={switchMyCardHandler}>
              My
            </Button>
            <Button variant={!isAllCardSwitch ? "contained" : "outlined"} onClick={switchAllCardHandler}>
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
      {cardPacks && cardPacks.length === 0 && (
        <div className={s.noPacks}>Unfortunately, we couldn't find any results based on your specified parameters.</div>
      )}
    </div>
  )
}
