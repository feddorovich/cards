import { Counter } from "features/counter/Counter"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import { store } from "app/store"
import { Provider } from "react-redux"
import { createTheme, ThemeProvider } from "@mui/material"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { useEffect } from "react"
import { appActions } from "features/app/app.slice"

export const Test = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()

  function handleErrorButtonClicked() {
    dispatch(appActions.setError({ error: "new error" }))
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }))
    }, 3000)
  }, [dispatch])

  if (isLoading) return <div>loading...</div>
  return (
    <div>
      <button onClick={handleErrorButtonClicked}>create error</button>
      {!!error && <h2>{error}</h2>}
      <Counter />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Test />,
    path: "/",
  },
  {
    element: <div>hello</div>,
    path: "/hello",
  },
])

const theme = createTheme()

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
