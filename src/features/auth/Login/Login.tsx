import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch } from "app/hooks"
import { FC } from "react"
import { authThunks } from "features/auth/auth.slice"
import { ArgLoginType } from "features/auth/auth.api"
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material"
import Button from "@mui/material/Button"

export const Login: FC = () => {
  const dispatch = useAppDispatch()

  const {
    getValues,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgLoginType>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit: SubmitHandler<ArgLoginType> = (data) => {
    dispatch(authThunks.login(data))
    console.log(data)
  }

  console.log(getValues("rememberMe"))

  return (
    <div>
      <h1>Sign in</h1>
      {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*  <TextField {...register("email")} />*/}
      {/*  <input defaultValue="fedsygreen@mail.ru" {...register("email")} />*/}
      {/*  <input defaultValue="12345678" {...register("password", { required: true })} />*/}
      {/*  {errors.password && <span>This field is required</span>}*/}
      {/*  <input type="checkbox" {...register("rememberMe")} />*/}
      {/*  <input type="submit" />*/}
      {/*</form>*/}

      <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormGroup>
                <TextField label="Email" variant="standard" margin="normal" {...register("email")} />
                <TextField
                  type="password"
                  label="Password"
                  variant="standard"
                  margin="normal"
                  autoComplete={"on"}
                  {...register("password")}
                />
                <FormControlLabel
                  label={"Remember me"}
                  control={<Checkbox checked={getValues("rememberMe")} {...register("rememberMe")} />}
                />
                <Button type={"submit"} variant={"contained"} color={"primary"}>
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}
