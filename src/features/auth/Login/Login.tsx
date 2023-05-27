import { useAppDispatch } from "app/hooks"
import { authThunks } from "features/auth/auth.slice"

export const Login = () => {
  const dispatch = useAppDispatch()

  const loginHandler = () => {
    const payload = {
      email: "fedsygreen@mail.ru",
      password: "12345678",
      rememberMe: false,
    }

    dispatch(authThunks.login(payload))
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={loginHandler}>login</button>
    </div>
  )
}
