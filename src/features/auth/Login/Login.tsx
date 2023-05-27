import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch } from "app/hooks"
import { FC } from "react"
import { authThunks } from "features/auth/auth.slice"
import { ArgLoginType } from "features/auth/auth.api"

export const Login: FC = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgLoginType>()
  const onSubmit: SubmitHandler<ArgLoginType> = (data) => {
    dispatch(authThunks.login(data))
  }

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="fedsygreen@mail.ru" {...register("email")} />
        <input defaultValue="12345678" {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
        <input type="checkbox" {...register("rememberMe")} />
        <input type="submit" />
      </form>
    </div>
  )
}
