import React, { useEffect, useState } from "react"
import { useGetUsersQuery } from "./users.api"
import CircularProgress from "@mui/material/CircularProgress"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "features/auth/auth.selector"

export const Users = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [skip, setSkip] = useState(true)
  const { data, error, isLoading } = useGetUsersQuery(undefined, { skip })
  console.log(data?.usersTotalCount)

  useEffect(() => {
    if (isLoggedIn) {
      setSkip(() => false)
    }
  }, [isLoggedIn])

  if (isLoading) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <div>
        {data?.users.map((u) => {
          return <div key={u._id}>{u.name}</div>
        })}
      </div>
    </div>
  )
}
