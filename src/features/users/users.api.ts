import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseURL } from "common/api/common.api"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: "include" }),
  endpoints: (build) => {
    return {
      getUsers: build.query<GetUsersResponseType, void>({
        query: () => {
          return {
            method: "GET",
            url: "social/users",
          }
        },
      }),
    }
  },
})

export const { useGetUsersQuery } = usersApi

export type GetUsersResponseType = {
  users: UsersResponseType[]
  page: number
  pageCount: number
  usersTotalCount: number
  minPublicCardPacksCount: number
  maxPublicCardPacksCount: number
  token: string
  tokenDeathTime: number
}
export type UsersResponseType = {
  _id: string
  email: string
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
}
