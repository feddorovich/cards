import { createBrowserRouter } from "react-router-dom"
import { Layout } from "features/layout/Layout"
import App from "app/App"
import { Login } from "features/auth/Login/Login"
import { Register } from "features/auth/Register/Register"
import { PasswordReset } from "features/auth/PasswordReset/PasswordReset"
import { CheckEmail } from "features/auth/CheckEmail/CheckEmail"
import { SetNewPassword } from "features/auth/SetNewPassword/SetNewPassword"
import { Profile } from "features/profile/Profile"
import React from "react"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
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
    path: "/packs",
    element: <div>Packs</div>,
  },
])
