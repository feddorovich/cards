import React, { FC, useEffect } from "react"
import s from "./MyPack.module.css"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Navigate, NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom"
import TableSortLabel from "@mui/material/TableSortLabel"
import TableRow from "@mui/material/TableRow"
import TableHead from "@mui/material/TableHead"
import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import Table from "@mui/material/Table"
import Rating from "@mui/material/Rating"
import Paper from "@mui/material/Paper"
import IconButton from "@mui/material/IconButton"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import SchoolIcon from "@mui/icons-material/School"
import { Search } from "features/packs/Packs/Search/Search"
import SuperPagination from "features/packs/Packs/Pagination/SuperPagination"
import { cardsThunks } from "features/cards/cards.slice"
import { selectId, selectIsLoggedIn } from "features/auth/auth.selector"
import { selectIsLoading } from "app/app.selector"
import { selectCards, selectCardsSettings } from "features/cards/cards.selector"
import { AddNewCardModal } from "features/modal/AddNewCardModal/AddNewCardModal"
import { EditCardModal } from "features/modal/EditCardModal/EditCardModal"
import { DeleteCardModal } from "features/modal/DeleteCardModal/DeleteCardModal"
import { EditPackModal } from "features/modal/EditPackModal/EditPackModal"
import { DeletePackModal } from "features/modal/DeletePackModal/DeletePackModal"
import { formatDate } from "common/utils"
import Typography from "@mui/material/Typography"
import back from "assets/image/back.png"
import deckCover from "assets/image/deckCover.png"

export const MyPack: FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams({})
  const params = Object.fromEntries(searchParams)
  const id = useAppSelector(selectId)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isLoading = useAppSelector(selectIsLoading)
  const cards = useAppSelector(selectCards)
  const cardsSettings = useAppSelector(selectCardsSettings)
  const { packId } = useParams()
  // const packId = document.location.href.split("/")[4].split("?")[0]
  const navigate = useNavigate()
  // console.log(cards)

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

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (cardsSettings.packName === undefined) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={s.myPack}>
      <div className={s.back}>
        <NavLink to={"/"}>
          <Typography>
            <img src={back} alt="back" />
            <span> Back to Packs List</span>
          </Typography>
        </NavLink>
      </div>

      {cards && cards.length === 0 ? (
        <div>
          <div className={s.header}>
            <div className={s.packsList}>My Pack - {cardsSettings.packName}</div>
          </div>
          <div className={s.noPacks}>This pack is empty. Click add new card to fill this pack.</div>
          <div className={s.noPacksButton}>
            <Button
              type={"submit"}
              variant="contained"
              color={"primary"}
              size={"large"}
              sx={{ borderRadius: 6 }}
              disabled={isLoading}
            >
              <AddNewCardModal cardsPack_id={packId ?? ""}>Add new card</AddNewCardModal>
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className={s.header}>
            <div className={s.packsList}>
              <img src={cardsSettings.packDeckCover ? cardsSettings.packDeckCover : deckCover} alt="deckCover" />
              My Pack - {cardsSettings.packName}
              <div className={s.buttons}>
                <IconButton
                  sx={{ padding: "1px 1px" }}
                  aria-label="learn"
                  onClick={() => {
                    navigate(`/learn/${packId}`)
                  }}
                >
                  <div>
                    <SchoolIcon />
                  </div>
                </IconButton>
                <IconButton aria-label="edit" disabled={isLoading} sx={{ padding: "1px 1px" }}>
                  <EditPackModal _id={packId ?? ""}>
                    <EditIcon />
                  </EditPackModal>
                </IconButton>
                <IconButton aria-label="delete" disabled={isLoading} sx={{ padding: "1px 1px" }}>
                  <DeletePackModal _id={packId ?? ""}>
                    <DeleteIcon />
                  </DeletePackModal>
                </IconButton>
              </div>
            </div>

            <Button
              type={"submit"}
              variant="contained"
              color={"primary"}
              sx={{ borderRadius: 1, height: 36 }}
              disabled={isLoading}
            >
              <AddNewCardModal cardsPack_id={packId ?? ""}>Add new card</AddNewCardModal>
            </Button>
          </div>
          <div className={s.settings}>
            <div className={s.search}>
              <div>Search</div>
              <Search onChange={changeSearchParams} value={params.cardQuestion || ""} />
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
              <TableHead>
                <TableRow hover={true} className={s.tableHead}>
                  <TableCell align="left" sx={{ padding: "8px 36px" }} onClick={handleSortQuestionRequest}>
                    <TableSortLabel
                      active={params.sortCards === "0question" || params.sortCards === "1question"}
                      direction={params.sortCards === "1question" || "" ? "asc" : "desc"}
                    >
                      Question
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left" onClick={handleSortAnswerRequest}>
                    <TableSortLabel
                      active={params.sortCards === "0answer" || params.sortCards === "1answer"}
                      direction={params.sortCards === "0answer" || "" ? "asc" : "desc"}
                    >
                      Answer
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left" onClick={handleSortUpdatedDateRequest}>
                    <TableSortLabel
                      active={params.sortCards === "0updated" || params.sortCards === "1updated"}
                      direction={params.sortCards === "0updated" || "" ? "asc" : "desc"}
                    >
                      Last Updated
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">Grade</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards &&
                  cards.map((row) => (
                    <TableRow key={row._id} hover={true}>
                      <TableCell component="th" scope="row" align="left" sx={{ padding: "8px 24px" }}>
                        {row.questionImg ? (
                          <div className={s.pictureQuestions}>
                            <img src={row.questionImg} alt="questionImg" />
                          </div>
                        ) : (
                          <span>{row.question}</span>
                        )}
                      </TableCell>
                      <TableCell align="left" sx={{ padding: "8px 16px" }}>
                        {row.answerImg ? (
                          <div className={s.pictureQuestions}>
                            <img src={row.answerImg} alt="answerImg" />
                          </div>
                        ) : (
                          <span>{row.answer}</span>
                        )}
                      </TableCell>
                      <TableCell align="left" sx={{ padding: "8px 16px" }}>
                        {formatDate(row.updated)}
                      </TableCell>
                      <TableCell align="left" sx={{ padding: "8px 16px" }}>
                        <Rating precision={0.1} readOnly value={+row.grade} />
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "8px 16px" }}>
                        {row.user_id === id && (
                          <div>
                            <IconButton aria-label="edit" disabled={isLoading} sx={{ padding: "1px 5px" }}>
                              <EditCardModal cardsPack_id={packId ?? ""} cardId={row._id}>
                                <EditIcon />
                              </EditCardModal>
                            </IconButton>
                            <IconButton aria-label="delete" disabled={isLoading} sx={{ padding: "1px 5px" }}>
                              <DeleteCardModal cardId={row._id}>{<DeleteIcon />}</DeleteCardModal>
                            </IconButton>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
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
      )}
    </div>
  )
}
