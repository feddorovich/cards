import { toast, ToastContainer } from "react-toastify"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { useEffect } from "react"
import { appActions } from "app/app.slice"

export const GlobalError = () => {
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()

  if (error !== null) {
    toast.error(error)
  }

  useEffect(() => {
    if (error !== null) {
      dispatch(appActions.setError({ error: null }))
    }
  }, [error])

  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  )
}
