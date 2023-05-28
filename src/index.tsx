import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "app/store"
import App from "app/App"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Register } from "features/auth/Register/Register"
import { Header } from "features/header/Header"
import { Login } from "features/auth/Login/Login"
import { Container } from "features/Container/Container"
import { PasswordReset } from "features/auth/PasswordReset/PasswordReset"
import { CheckEmail } from "features/auth/CheckEmail/CheckEmail"
import { SetNewPassword } from "features/auth/SetNewPassword/SetNewPassword"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password-reset",
    element: <PasswordReset />,
  },
  {
    path: "/check-email",
    element: <CheckEmail />,
  },
  {
    path: "set-new-password/:token",
    element: <SetNewPassword />,
  },
  {
    path: "/packs",
    element: <div>Packs</div>,
  },
])

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <Container>
      <Header />
      <RouterProvider router={router} />
    </Container>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
