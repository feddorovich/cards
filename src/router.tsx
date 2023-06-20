import { createHashRouter } from "react-router-dom"
import { Layout } from "features/layout/Layout"
import App from "app/App"
import { Login } from "features/auth/Login/Login"
import { Register } from "features/auth/Register/Register"
import { PasswordReset } from "features/auth/PasswordReset/PasswordReset"
import { CheckEmail } from "features/auth/CheckEmail/CheckEmail"
import { SetNewPassword } from "features/auth/SetNewPassword/SetNewPassword"
import { Profile } from "features/profile/Profile"
import React from "react"
import { FriendsPack } from "features/cards/Cards/FriendsPack"
import { MyPack } from "features/cards/Cards/MyPack"
import { Learn } from "features/learn/Learn"
import { Users } from "features/users/Users"
import Error404 from "common/components/Error404/Error404"

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    children: [],
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/password-reset",
    element: (
      <Layout>
        <PasswordReset />
      </Layout>
    ),
  },
  {
    path: "/check-email",
    element: (
      <Layout>
        <CheckEmail />
      </Layout>
    ),
  },
  {
    path: "set-new-password/:token",
    element: (
      <Layout>
        <SetNewPassword />
      </Layout>
    ),
  },
  {
    path: "profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/friends-pack/:packId",
    element: (
      <Layout>
        <FriendsPack />
      </Layout>
    ),
  },
  {
    path: "/my-pack/:packId",
    element: (
      <Layout>
        <MyPack />
      </Layout>
    ),
  },
  {
    path: "/learn/:packId",
    element: (
      <Layout>
        <Learn />
      </Layout>
    ),
  },
  {
    path: "/users",
    element: (
      <Layout>
        <Users />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <Error404 />
      </Layout>
    ),
  },
])
