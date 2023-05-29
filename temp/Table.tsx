// import { FC, ReactNode, useEffect, useState } from "react"
// import { useSearchParams } from "react-router-dom"
// import { useAppDispatch } from "app/hooks"
//
// const fetchFunction = (params: any) => {
//   /// disapt-то сch(какаяанка тут с парамтрами)
// }
//
// interface TableProps {
//   items: any[]
//   totalCount: number
//   headActions: ReactNode
//   fetchFunction?: (params: ParamsType) => void
//   fetchThunk?: any //тут должна быть типизация санки тулкита
// }
//
// export const Table: FC<TableProps> = ({ items, totalCount, fetchFunction, fetchThunk }) => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const dispatch = useAppDispatch()
//
//   const handleChangePage = (newPage: number) => {
//     const pageQuery: { page?: string } = newPage ? { page: newPage.toString() } : {}
//     const { page, ...otherQuery } = Object.fromEntries(searchParams)
//     setSearchParams({ ...pageQuery, ...otherQuery })
//     // fetchFunction?.({})
//   }
//
//   useEffect(() => {
//     dispatch(fetchThunk(params))
//   }, [dispatch, searchParams])
//
//   return (
//     <TableWrapper>
//       <TableHead />
//       <TableBody>
//         {items.map((el) => (
//           <TableRow>
//             <ItemEl el={el} />
//           </TableRow>
//         ))}
//         <TableActions>
//           <Pagination totalCount={totalCount} />
//         </TableActions>
//       </TableBody>
//     </TableWrapper>
//   )
// }
