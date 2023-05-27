import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useAppDispatch } from "app/hooks"
import { FC, useEffect } from "react"
import { authThunks } from "features/auth/auth.slice"
import { ArgLoginType } from "features/auth/auth.api"
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import s from "./Login.module.css"

export const Login: FC = () => {
  const dispatch = useAppDispatch()

  const {
    getValues,
    register,
    control,
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

  // console.log(register())

  return (
    <div>
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
          <div className={s.header}>Sign in</div>
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
                  label="Remember me"
                  control={
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
                      )}
                    />
                  }
                />
                <Button type={"submit"} variant={"contained"} color={"primary"} sx={{ borderRadius: 6 }}>
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
