import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "app/store"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "router"
import { GlobalError } from "common/components/GlobalError/GlobalError"
import "react-toastify/dist/ReactToastify.css"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <GlobalError />
  </Provider>
)
